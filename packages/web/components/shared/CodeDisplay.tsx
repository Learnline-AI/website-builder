import { useState, useCallback } from 'react'
import { Highlight, themes } from 'prism-react-renderer'

interface Dependency {
  name: string
  version: string
}

interface CodeDisplayProps {
  code: string
  example?: string
  propsInterface?: string
  dependencies?: Dependency[]
  language?: string
}

type TabId = 'code' | 'example' | 'props'

interface Tab {
  id: TabId
  label: string
  content: string | undefined
}

export function CodeDisplay({
  code,
  example,
  propsInterface,
  dependencies = [],
  language = 'tsx',
}: CodeDisplayProps) {
  const [activeTab, setActiveTab] = useState<TabId>('code')
  const [copied, setCopied] = useState(false)
  const [copyAnimating, setCopyAnimating] = useState(false)

  const tabs: Tab[] = [
    { id: 'code', label: 'Code', content: code },
    { id: 'example', label: 'Example', content: example },
    { id: 'props', label: 'Props', content: propsInterface },
  ].filter((tab): tab is Tab => tab.content !== undefined)

  const getCurrentContent = useCallback(() => {
    const tab = tabs.find(t => t.id === activeTab)
    return tab?.content || code
  }, [activeTab, tabs, code])

  const handleCopy = useCallback(async () => {
    const content = getCurrentContent()
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setCopyAnimating(true)
      setTimeout(() => setCopied(false), 2000)
      setTimeout(() => setCopyAnimating(false), 300)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [getCurrentContent])

  const currentContent = getCurrentContent()

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl shadow-black/30">
      {/* Header with tabs and copy button */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-800/50 border-b border-white/5">
        {/* Tabs */}
        <div className="flex items-center gap-1 relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-4 py-2 text-sm font-medium rounded-lg
                transition-all duration-300 ease-out
                ${activeTab === tab.id
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }
              `}
            >
              {/* Active tab background */}
              {activeTab === tab.id && (
                <span
                  className="absolute inset-0 rounded-lg bg-white/10 border border-white/10"
                  style={{
                    animation: 'tabSlide 300ms ease-out',
                  }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
            transition-all duration-300 ease-out
            ${copied
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-transparent'
            }
            ${copyAnimating ? 'scale-105' : 'scale-100'}
          `}
        >
          {copied ? (
            <>
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content with syntax highlighting */}
      <div className="relative overflow-auto max-h-[500px] custom-scrollbar">
        <Highlight
          theme={themes.nightOwl}
          code={currentContent.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} p-5 text-sm leading-relaxed`}
              style={{
                ...style,
                background: 'transparent',
                margin: 0,
              }}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i })
                return (
                  <div
                    key={i}
                    {...lineProps}
                    className={`${lineProps.className || ''} table-row`}
                  >
                    {/* Line number */}
                    <span className="table-cell pr-4 text-white/20 text-right select-none w-10">
                      {i + 1}
                    </span>
                    {/* Line content */}
                    <span className="table-cell">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </span>
                  </div>
                )
              })}
            </pre>
          )}
        </Highlight>

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-neutral-900 to-transparent pointer-events-none" />
      </div>

      {/* Dependencies section */}
      {dependencies.length > 0 && (
        <div className="px-5 py-4 bg-neutral-800/30 border-t border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <svg
              className="w-4 h-4 text-white/40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Dependencies
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {dependencies.map((dep) => (
              <div
                key={dep.name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
              >
                <span className="text-sm text-white/80 font-mono">{dep.name}</span>
                <span className="text-xs text-white/40 font-mono">{dep.version}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inline styles for tab animation */}
      <style>{`
        @keyframes tabSlide {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .custom-scrollbar::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
    </div>
  )
}
