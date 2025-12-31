/**
 * PropertyPanel
 *
 * Right sidebar panel for editing selected block properties.
 * Displays form controls based on the block type and slot definitions.
 */

import React, { useState } from 'react';
import { useEditorStore, useSelectedBlock } from './store';
import { getElement } from '../../elements/registry';
import type { SlotDefinition } from '../../elements/registry';

// ============================================================================
// FORM CONTROLS
// ============================================================================

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  description?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  description,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-white/70">{label}</label>
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-indigo-500/50"
    />
    {description && <p className="text-xs text-white/40">{description}</p>}
  </div>
);

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-white/70">{label}</label>
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-indigo-500/50 resize-none"
    />
  </div>
);

// SelectInput - reserved for future use with variant selection
// interface SelectInputProps {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   options: Array<{ value: string; label: string }>;
// }

// const SelectInput: React.FC<SelectInputProps> = ({
//   label,
//   value,
//   onChange,
//   options,
// }) => (
//   <div className="space-y-2">
//     <label className="block text-sm font-medium text-white/70">{label}</label>
//     <select
//       value={value || ''}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500/50 cursor-pointer"
//     >
//       {options.map((opt) => (
//         <option key={opt.value} value={opt.value} className="bg-neutral-900">
//           {opt.label}
//         </option>
//       ))}
//     </select>
//   </div>
// );

interface ToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  description?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  label,
  value,
  onChange,
  description,
}) => (
  <div className="flex items-start justify-between gap-4">
    <div>
      <label className="block text-sm font-medium text-white/70">{label}</label>
      {description && <p className="text-xs text-white/40 mt-1">{description}</p>}
    </div>
    <button
      onClick={() => onChange(!value)}
      className={`
        relative w-11 h-6 rounded-full transition-colors duration-200
        ${value ? 'bg-indigo-500' : 'bg-white/10'}
      `}
    >
      <div
        className={`
          absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200
          ${value ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  </div>
);

// ============================================================================
// SLOT EDITOR
// ============================================================================

interface SlotEditorProps {
  slot: SlotDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
}

const SlotEditor: React.FC<SlotEditorProps> = ({ slot, value, onChange }) => {
  switch (slot.type) {
    case 'text':
      return (
        <TextInput
          label={slot.name}
          value={(value as string) || ''}
          onChange={onChange}
          placeholder={slot.placeholder}
          description={slot.description}
        />
      );

    case 'richText':
      return (
        <TextArea
          label={slot.name}
          value={(value as string) || ''}
          onChange={onChange}
          placeholder={slot.placeholder}
          rows={4}
        />
      );

    case 'image': {
      const imgValue = (value as { src?: string; alt?: string }) || {};
      return (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-white/70">{slot.name}</label>
          <TextInput
            label="Image URL"
            value={imgValue.src || ''}
            onChange={(src) => onChange({ ...imgValue, src })}
            placeholder="https://..."
          />
          <TextInput
            label="Alt Text"
            value={imgValue.alt || ''}
            onChange={(alt) => onChange({ ...imgValue, alt })}
            placeholder="Describe the image"
          />
        </div>
      );
    }

    case 'link': {
      const linkValue = (value as { href?: string; label?: string }) || {};
      return (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-white/70">{slot.name}</label>
          <TextInput
            label="Link URL"
            value={linkValue.href || ''}
            onChange={(href) => onChange({ ...linkValue, href })}
            placeholder="https://..."
          />
          <TextInput
            label="Link Text"
            value={linkValue.label || ''}
            onChange={(label) => onChange({ ...linkValue, label })}
            placeholder="Click here"
          />
        </div>
      );
    }

    default:
      return (
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-white/50">
            Slot type "{slot.type}" editor not implemented
          </p>
        </div>
      );
  }
};

// ============================================================================
// PROPERTY PANEL
// ============================================================================

export const PropertyPanel: React.FC = () => {
  const selectedBlock = useSelectedBlock();
  const {
    updateBlockProps,
    removeBlock,
    duplicateBlock,
    selectBlock,
    canUndo,
    canRedo,
    undo,
    redo,
  } = useEditorStore();

  const [activeTab, setActiveTab] = useState<'props' | 'slots' | 'style'>('props');

  // Get element definition
  const element = selectedBlock ? getElement(selectedBlock.type) : null;

  // No selection state
  if (!selectedBlock || !element) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M4 12h16" />
            <path d="M12 4v16" />
          </svg>
        </div>
        <h3 className="text-white/70 font-medium mb-2">No block selected</h3>
        <p className="text-white/40 text-sm">
          Click on a block in the canvas to edit its properties
        </p>
      </div>
    );
  }

  const blockId = selectedBlock._uiMuseum?.id || '';

  // Handle prop changes
  const handlePropChange = (key: string, value: unknown) => {
    updateBlockProps(blockId, { [key]: value });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-white truncate">
              {element.name}
            </h3>
            <span className="px-2 py-0.5 text-[10px] rounded bg-white/10 text-white/50 uppercase">
              {element.layer}
            </span>
          </div>
          <button
            onClick={() => selectBlock(null)}
            className="w-6 h-6 rounded flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-white/40 mt-1 truncate">{element.description}</p>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 px-4 py-2 border-b border-white/10">
        <div className="flex gap-1">
          {(['props', 'slots', 'style'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors
                ${activeTab === tab
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'props' && (
          <div className="space-y-4">
            {/* Generic props editor */}
            {Object.entries(selectedBlock.props || {}).map(([key, value]) => {
              if (typeof value === 'string') {
                return (
                  <TextInput
                    key={key}
                    label={key}
                    value={value}
                    onChange={(v) => handlePropChange(key, v)}
                  />
                );
              }
              if (typeof value === 'boolean') {
                return (
                  <Toggle
                    key={key}
                    label={key}
                    value={value}
                    onChange={(v) => handlePropChange(key, v)}
                  />
                );
              }
              return (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-white/70">{key}</label>
                  <div className="p-2 rounded bg-white/5 text-xs text-white/50 font-mono">
                    {JSON.stringify(value)}
                  </div>
                </div>
              );
            })}

            {Object.keys(selectedBlock.props || {}).length === 0 && (
              <p className="text-sm text-white/40">No editable props</p>
            )}
          </div>
        )}

        {activeTab === 'slots' && (
          <div className="space-y-6">
            {element.slots?.map((slot) => (
              <SlotEditor
                key={slot.id}
                slot={slot}
                value={selectedBlock._uiMuseum?.slots?.[slot.id]?.value}
                onChange={(value) => {
                  // Update slot value in block
                  const currentSlots = selectedBlock._uiMuseum?.slots || {};
                  updateBlockProps(blockId, {
                    _uiMuseum: {
                      ...selectedBlock._uiMuseum,
                      slots: {
                        ...currentSlots,
                        [slot.id]: { type: slot.type, value },
                      },
                    },
                  });
                }}
              />
            ))}

            {(!element.slots || element.slots.length === 0) && (
              <p className="text-sm text-white/40">No slots available</p>
            )}
          </div>
        )}

        {activeTab === 'style' && (
          <div className="space-y-4">
            <TextInput
              label="CSS Class"
              value={(selectedBlock.props?.className as string) || ''}
              onChange={(v) => handlePropChange('className', v)}
              placeholder="Additional Tailwind classes"
            />
            <p className="text-xs text-white/40">
              Add custom Tailwind classes to override default styling.
            </p>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="flex-shrink-0 p-4 border-t border-white/10 space-y-3">
        {/* Undo/Redo */}
        <div className="flex gap-2">
          <button
            onClick={undo}
            disabled={!canUndo()}
            className="flex-1 px-3 py-2 rounded-lg bg-white/5 text-white/70 text-xs font-medium hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 7v6h6M3 13a9 9 0 102.41-7.5" />
            </svg>
            Undo
          </button>
          <button
            onClick={redo}
            disabled={!canRedo()}
            className="flex-1 px-3 py-2 rounded-lg bg-white/5 text-white/70 text-xs font-medium hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            Redo
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 7v6h-6M21 13a9 9 0 10-2.41-7.5" />
            </svg>
          </button>
        </div>

        {/* Duplicate/Delete */}
        <div className="flex gap-2">
          <button
            onClick={() => duplicateBlock(blockId)}
            className="flex-1 px-3 py-2 rounded-lg bg-white/5 text-white/70 text-xs font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            Duplicate
          </button>
          <button
            onClick={() => removeBlock(blockId)}
            className="flex-1 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyPanel;
