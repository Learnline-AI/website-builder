// Organism: Media
// Complex media display components
// Can import molecules and atoms

import React from 'react';
import { ElementEntry } from '../../registry';

// ============================================
// MEDIA COMPONENTS
// ============================================

interface ImageItem {
  src: string;
  alt?: string;
  caption?: string;
}

export const ImageGallery: React.FC<{ images: ImageItem[]; columns?: number; gap?: number; variant?: string; className?: string }> = ({
  images,
  columns = 3,
  gap = 4,
  variant = 'default',
  className = '',
}) => {
  const [selected, setSelected] = React.useState<number | null>(null);

  const variants: Record<string, { item: string; overlay: string }> = {
    default: {
      item: 'rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity',
      overlay: 'bg-black/80',
    },
    brutal: {
      item: 'border-4 border-black cursor-pointer hover:shadow-[4px_4px_0_0_#000] transition-shadow',
      overlay: 'bg-white border-4 border-black',
    },
    neon: {
      item: 'border border-[#33ff00]/30 cursor-pointer hover:border-[#33ff00] hover:shadow-[0_0_20px_rgba(51,255,0,0.3)] transition-all',
      overlay: 'bg-black/95 border border-[#33ff00]',
    },
  };
  const style = variants[variant] || variants.default;

  return (
    <>
      <div className={`grid gap-${gap} ${className}`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {images.map((img, i) => (
          <div key={i} className={`aspect-square bg-gray-200 ${style.item}`} onClick={() => setSelected(i)}>
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">{img.alt || `Image ${i + 1}`}</div>
          </div>
        ))}
      </div>
      {selected !== null && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${style.overlay}`} onClick={() => setSelected(null)}>
          <div className="max-w-4xl w-full aspect-video bg-gray-800 rounded-lg flex items-center justify-center text-white">
            {images[selected].alt || `Image ${selected + 1}`}
          </div>
          <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setSelected(null)}>×</button>
        </div>
      )}
    </>
  );
};

export const Carousel: React.FC<{ items: React.ReactNode[]; autoPlay?: boolean; interval?: number; variant?: string; className?: string }> = ({
  items,
  autoPlay = false,
  interval = 5000,
  variant = 'default',
  className = '',
}) => {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % items.length), interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const variants: Record<string, { container: string; nav: string; dot: string; dotActive: string }> = {
    default: {
      container: 'relative rounded-xl overflow-hidden',
      nav: 'absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white shadow-lg',
      dot: 'w-2 h-2 rounded-full bg-white/50',
      dotActive: 'bg-white w-4',
    },
    brutal: {
      container: 'relative border-4 border-black overflow-hidden',
      nav: 'absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-yellow-400 border-4 border-black flex items-center justify-center font-bold',
      dot: 'w-3 h-3 bg-white border-2 border-black',
      dotActive: 'bg-yellow-400 w-6',
    },
    neon: {
      container: 'relative border border-[#33ff00] overflow-hidden',
      nav: 'absolute top-1/2 -translate-y-1/2 w-10 h-10 border border-[#33ff00] text-[#33ff00] flex items-center justify-center hover:bg-[#33ff00]/20',
      dot: 'w-2 h-2 border border-[#33ff00]/50',
      dotActive: 'bg-[#33ff00] w-4 shadow-[0_0_10px_rgba(51,255,0,0.5)]',
    },
  };
  const style = variants[variant] || variants.default;

  return (
    <div className={`${style.container} ${className}`}>
      <div className="aspect-video bg-gray-200 flex items-center justify-center">
        {items[current]}
      </div>
      <button className={`${style.nav} left-2`} onClick={() => setCurrent((c) => (c - 1 + items.length) % items.length)}>←</button>
      <button className={`${style.nav} right-2`} onClick={() => setCurrent((c) => (c + 1) % items.length)}>→</button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`${style.dot} ${i === current ? style.dotActive : ''} transition-all`} />
        ))}
      </div>
    </div>
  );
};

export const VideoPlayer: React.FC<{ poster?: string; title?: string; duration?: string; variant?: string; className?: string }> = ({
  poster: _poster,
  title = 'Video Title',
  duration = '0:00',
  variant = 'default',
  className = '',
}) => {
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const variants: Record<string, { container: string; controls: string; progress: string; progressFill: string }> = {
    default: {
      container: 'rounded-xl overflow-hidden bg-black',
      controls: 'bg-gradient-to-t from-black/80 to-transparent',
      progress: 'bg-white/30',
      progressFill: 'bg-white',
    },
    brutal: {
      container: 'border-4 border-black overflow-hidden bg-black',
      controls: 'bg-yellow-400 border-t-4 border-black',
      progress: 'bg-black/30',
      progressFill: 'bg-black',
    },
    neon: {
      container: 'border border-[#33ff00] overflow-hidden bg-black',
      controls: 'bg-black border-t border-[#33ff00]',
      progress: 'bg-[#33ff00]/20',
      progressFill: 'bg-[#33ff00] shadow-[0_0_10px_rgba(51,255,0,0.5)]',
    },
  };
  const style = variants[variant] || variants.default;

  return (
    <div className={`relative ${style.container} ${className}`}>
      <div className="aspect-video bg-gray-800 flex items-center justify-center">
        <button onClick={() => setPlaying(!playing)} className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl hover:bg-white/30">
          {playing ? '❚❚' : '▶'}
        </button>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 p-4 ${style.controls}`}>
        <div className={`h-1 ${style.progress} rounded-full mb-3 cursor-pointer`} onClick={(e) => setProgress((e.nativeEvent.offsetX / e.currentTarget.offsetWidth) * 100)}>
          <div className={`h-full ${style.progressFill} rounded-full`} style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center justify-between text-white text-sm">
          <span>{title}</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
};

export const AudioPlayer: React.FC<{ title?: string; artist?: string; duration?: string; variant?: string; className?: string }> = ({
  title = 'Track Title',
  artist = 'Artist Name',
  duration = '3:45',
  variant = 'default',
  className = '',
}) => {
  const [playing, setPlaying] = React.useState(false);
  const [progress] = React.useState(30);

  const variants: Record<string, { container: string; progress: string; progressFill: string; btn: string }> = {
    default: {
      container: 'bg-white rounded-xl shadow-lg p-4',
      progress: 'bg-gray-200',
      progressFill: 'bg-blue-500',
      btn: 'w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center',
    },
    brutal: {
      container: 'bg-white border-4 border-black shadow-[4px_4px_0_0_#000] p-4',
      progress: 'bg-gray-200 border-2 border-black',
      progressFill: 'bg-yellow-400',
      btn: 'w-12 h-12 bg-yellow-400 border-4 border-black flex items-center justify-center font-bold',
    },
    neon: {
      container: 'bg-black border border-[#33ff00] p-4 text-[#33ff00]',
      progress: 'bg-gray-800',
      progressFill: 'bg-[#33ff00] shadow-[0_0_10px_rgba(51,255,0,0.5)]',
      btn: 'w-12 h-12 border border-[#33ff00] text-[#33ff00] flex items-center justify-center hover:bg-[#33ff00]/20',
    },
  };
  const style = variants[variant] || variants.default;

  return (
    <div className={`${style.container} ${className}`}>
      <div className="flex items-center gap-4">
        <button onClick={() => setPlaying(!playing)} className={style.btn}>{playing ? '❚❚' : '▶'}</button>
        <div className="flex-1">
          <p className="font-semibold">{title}</p>
          <p className="text-sm opacity-70">{artist}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className={`h-1 ${style.progress} rounded-full`}>
          <div className={`h-full ${style.progressFill} rounded-full transition-all`} style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between text-xs mt-1 opacity-70">
          <span>1:07</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
};

export const MediaCard: React.FC<{ type?: 'image' | 'video' | 'audio'; title?: string; description?: string; thumbnail?: string; duration?: string; variant?: string; className?: string }> = ({
  type = 'image',
  title = 'Media Title',
  description,
  thumbnail: _thumbnail,
  duration,
  variant = 'default',
  className = '',
}) => {
  const variants: Record<string, string> = {
    default: 'bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow',
    brutal: 'bg-white border-4 border-black shadow-[4px_4px_0_0_#000] overflow-hidden hover:shadow-[2px_2px_0_0_#000] hover:translate-x-1 hover:translate-y-1 transition-all',
    neon: 'bg-black border border-[#33ff00]/30 overflow-hidden hover:border-[#33ff00] hover:shadow-[0_0_20px_rgba(51,255,0,0.2)] transition-all text-[#33ff00]',
  };

  const typeIcons: Record<string, string> = { image: '🖼️', video: '🎬', audio: '🎵' };

  return (
    <div className={`${variants[variant] || variants.default} ${className}`}>
      <div className="aspect-video bg-gray-200 relative flex items-center justify-center">
        <span className="text-4xl opacity-50">{typeIcons[type]}</span>
        {duration && (
          <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">{duration}</span>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-semibold">{title}</h4>
        {description && <p className="text-sm opacity-70 mt-1">{description}</p>}
      </div>
    </div>
  );
};

export const Avatar: React.FC<{ src?: string; name?: string; size?: 'sm' | 'md' | 'lg' | 'xl'; status?: 'online' | 'offline' | 'busy' | 'away'; variant?: string; className?: string }> = ({
  src,
  name = 'User',
  size = 'md',
  status,
  variant = 'default',
  className = '',
}) => {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-lg' };
  const statusColors: Record<string, string> = { online: 'bg-green-500', offline: 'bg-gray-400', busy: 'bg-red-500', away: 'bg-amber-500' };
  const statusSizes = { sm: 'w-2 h-2', md: 'w-2.5 h-2.5', lg: 'w-3 h-3', xl: 'w-4 h-4' };

  const variants: Record<string, string> = {
    default: 'rounded-full bg-gray-200 text-gray-600',
    brutal: 'bg-yellow-400 text-black border-4 border-black',
    neon: 'bg-black text-[#33ff00] border border-[#33ff00]',
  };

  return (
    <div className={`relative inline-flex ${className}`}>
      <div className={`${sizes[size]} ${variants[variant] || variants.default} flex items-center justify-center font-semibold`}>
        {src ? <img src={src} alt={name} className="w-full h-full object-cover rounded-full" /> : name[0].toUpperCase()}
      </div>
      {status && (
        <span className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]} rounded-full border-2 border-white`} />
      )}
    </div>
  );
};

export const AvatarGroup: React.FC<{ avatars: { name?: string; src?: string }[]; max?: number; size?: 'sm' | 'md' | 'lg'; variant?: string; className?: string }> = ({
  avatars,
  max = 4,
  size = 'md',
  variant = 'default',
  className = '',
}) => {
  const displayed = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {displayed.map((avatar, i) => (
        <Avatar key={i} name={avatar.name} src={avatar.src} size={size} variant={variant} className="ring-2 ring-white" />
      ))}
      {remaining > 0 && (
        <Avatar name={`+${remaining}`} size={size} variant={variant} className="ring-2 ring-white" />
      )}
    </div>
  );
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createMediaEntry = (id: string, name: string, description: string, tags: string[], component: React.FC<any>, composedOf: string[] = []): ElementEntry => ({
  id: `org-media-${id}`, name, layer: 'organism', category: 'organisms', description, themeAgnostic: false, composedOf,
  sourceComponents: ['multiple-zones'], extractedFrom: 'src/elements/organisms/media/index.tsx',
  previewType: 'card', hasInteraction: true, implementation: 'component', component,
  codeSnippet: `<${name.replace(/\s/g, '')} />`, tags: ['media', 'organism', ...tags],
});

export const mediaRegistry: ElementEntry[] = [
  // Gallery
  createMediaEntry('gallery-default', 'Image Gallery', 'Grid image gallery with lightbox', ['gallery', 'images', 'grid'], ImageGallery, ['card-default']),
  createMediaEntry('gallery-brutal', 'Brutal Gallery', 'Neo-brutal image gallery', ['gallery', 'brutal'], ImageGallery, ['border-brutal']),
  createMediaEntry('gallery-neon', 'Neon Gallery', 'Glowing image gallery', ['gallery', 'neon'], ImageGallery, ['glow-green']),
  // Carousel
  createMediaEntry('carousel-default', 'Carousel', 'Image/content carousel', ['carousel', 'slider', 'slideshow'], Carousel, []),
  createMediaEntry('carousel-brutal', 'Brutal Carousel', 'Neo-brutal carousel', ['carousel', 'brutal'], Carousel, ['border-brutal']),
  createMediaEntry('carousel-neon', 'Neon Carousel', 'Glowing carousel', ['carousel', 'neon'], Carousel, ['glow-green']),
  // Video
  createMediaEntry('video-player', 'Video Player', 'Video player with controls', ['video', 'player', 'controls'], VideoPlayer, ['indicator-progress']),
  createMediaEntry('video-brutal', 'Brutal Video', 'Neo-brutal video player', ['video', 'brutal'], VideoPlayer, ['border-brutal']),
  createMediaEntry('video-neon', 'Neon Video', 'Glowing video player', ['video', 'neon'], VideoPlayer, ['glow-green']),
  // Audio
  createMediaEntry('audio-player', 'Audio Player', 'Audio player with progress', ['audio', 'player', 'music'], AudioPlayer, ['indicator-progress']),
  createMediaEntry('audio-brutal', 'Brutal Audio', 'Neo-brutal audio player', ['audio', 'brutal'], AudioPlayer, ['border-brutal']),
  createMediaEntry('audio-neon', 'Neon Audio', 'Glowing audio player', ['audio', 'neon'], AudioPlayer, ['glow-green']),
  // Media Card
  createMediaEntry('media-card', 'Media Card', 'Media thumbnail card', ['media', 'card', 'thumbnail'], MediaCard, ['card-default']),
  createMediaEntry('media-brutal', 'Brutal Media Card', 'Neo-brutal media card', ['media', 'brutal'], MediaCard, ['card-brutal']),
  // Avatar
  createMediaEntry('avatar-default', 'Avatar', 'User avatar with status', ['avatar', 'user', 'profile'], Avatar, ['border-radius-full']),
  createMediaEntry('avatar-brutal', 'Brutal Avatar', 'Neo-brutal avatar', ['avatar', 'brutal'], Avatar, ['border-brutal']),
  createMediaEntry('avatar-group', 'Avatar Group', 'Stacked avatar group', ['avatar', 'group', 'users'], AvatarGroup, []),
];
