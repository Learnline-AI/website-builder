import React, { useState } from 'react';

// ============================================================================
// CONTENT TEMPLATES
// Page-level layouts for content-focused experiences
// ============================================================================

interface TemplateEntry {
  id: string;
  name: string;
  layer: 'template';
  category: 'marketing' | 'application' | 'content' | 'auth';
  description: string;
  sections: string[];
  composedOf: string[];
  themeAgnostic: boolean;
  sourceComponents: string[];
  extractedFrom: string;
  previewType: 'fullwidth';
  hasInteraction: boolean;
  implementation: 'component';
  component: React.FC<any>;
  codeSnippet: string;
  tags: string[];
}

// ============================================================================
// BLOG LIST TEMPLATE
// ============================================================================

const blogVariants = {
  default: {
    container: 'min-h-screen bg-gray-50',
    header: 'bg-white border-b border-gray-200',
    nav: 'text-gray-600 hover:text-gray-900',
    title: 'text-gray-900',
    card: 'bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow',
    cardTitle: 'text-gray-900',
    cardMeta: 'text-gray-500',
    cardExcerpt: 'text-gray-600',
    tag: 'bg-blue-100 text-blue-700',
    sidebar: 'bg-white border border-gray-200 rounded-lg',
    footer: 'bg-gray-900 text-white',
  },
  dark: {
    container: 'min-h-screen bg-gray-900',
    header: 'bg-gray-800 border-b border-gray-700',
    nav: 'text-gray-400 hover:text-white',
    title: 'text-white',
    card: 'bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors',
    cardTitle: 'text-white',
    cardMeta: 'text-gray-400',
    cardExcerpt: 'text-gray-300',
    tag: 'bg-blue-900 text-blue-300',
    sidebar: 'bg-gray-800 border border-gray-700 rounded-lg',
    footer: 'bg-gray-950 text-white',
  },
  brutal: {
    container: 'min-h-screen bg-amber-50',
    header: 'bg-white border-b-4 border-black',
    nav: 'text-black hover:bg-yellow-300',
    title: 'text-black font-black',
    card: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] transition-all',
    cardTitle: 'text-black font-black',
    cardMeta: 'text-gray-600 font-mono',
    cardExcerpt: 'text-gray-800',
    tag: 'bg-yellow-300 text-black border-2 border-black',
    sidebar: 'bg-white border-4 border-black shadow-[4px_4px_0_0_#000]',
    footer: 'bg-black text-white border-t-4 border-yellow-400',
  },
  neon: {
    container: 'min-h-screen bg-gray-950',
    header: 'bg-black/80 border-b border-cyan-500/30 backdrop-blur-xl',
    nav: 'text-cyan-400 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]',
    title: 'text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]',
    card: 'bg-gray-900/80 border border-cyan-500/30 rounded-lg hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all backdrop-blur',
    cardTitle: 'text-cyan-300',
    cardMeta: 'text-purple-400',
    cardExcerpt: 'text-gray-300',
    tag: 'bg-cyan-900/50 text-cyan-300 border border-cyan-500/50',
    sidebar: 'bg-gray-900/80 border border-purple-500/30 rounded-lg backdrop-blur',
    footer: 'bg-black text-cyan-400 border-t border-cyan-500/30',
  },
  glass: {
    container: 'min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
    header: 'bg-white/10 border-b border-white/20 backdrop-blur-xl',
    nav: 'text-white/70 hover:text-white',
    title: 'text-white',
    card: 'bg-white/10 border border-white/20 rounded-2xl hover:bg-white/15 transition-colors backdrop-blur-xl',
    cardTitle: 'text-white',
    cardMeta: 'text-white/50',
    cardExcerpt: 'text-white/70',
    tag: 'bg-white/20 text-white border border-white/30',
    sidebar: 'bg-white/10 border border-white/20 rounded-2xl backdrop-blur-xl',
    footer: 'bg-black/30 text-white/70 backdrop-blur-xl',
  },
};

interface BlogListTemplateProps {
  variant?: keyof typeof blogVariants;
}

export const BlogListTemplate: React.FC<BlogListTemplateProps> = ({ variant = 'default' }) => {
  const styles = blogVariants[variant];
  const [selectedCategory, setSelectedCategory] = useState('all');

  const posts = [
    { id: 1, title: 'Getting Started with React 19', category: 'tutorials', date: 'Dec 25, 2024', readTime: '8 min', excerpt: 'Learn about the new features in React 19 including concurrent rendering and automatic batching.' },
    { id: 2, title: 'Building Accessible Components', category: 'design', date: 'Dec 23, 2024', readTime: '12 min', excerpt: 'A comprehensive guide to creating components that work for everyone.' },
    { id: 3, title: 'State Management Patterns', category: 'architecture', date: 'Dec 20, 2024', readTime: '15 min', excerpt: 'Comparing Redux, Zustand, and React Context for modern applications.' },
    { id: 4, title: 'CSS-in-JS vs Tailwind', category: 'design', date: 'Dec 18, 2024', readTime: '10 min', excerpt: 'An honest comparison of styling approaches in 2024.' },
  ];

  const categories = ['all', 'tutorials', 'design', 'architecture'];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={`${styles.header} sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className={`${styles.title} text-xl font-bold`}>DevBlog</span>
          <nav className="flex gap-6">
            {['Home', 'Articles', 'Categories', 'About'].map((item) => (
              <a key={item} className={`${styles.nav} transition-colors cursor-pointer`}>{item}</a>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className={`${styles.title} text-4xl font-bold mb-4`}>Latest Articles</h1>
          <p className={styles.cardExcerpt}>Insights on development, design, and technology</p>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Category Filter */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`${styles.tag} px-4 py-1.5 rounded-full text-sm capitalize transition-all ${
                    selectedCategory === cat ? 'ring-2 ring-offset-2' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Posts Grid */}
            <div className="grid gap-6">
              {posts
                .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
                .map((post) => (
                  <article key={post.id} className={`${styles.card} p-6 cursor-pointer`}>
                    <div className="flex items-start justify-between mb-3">
                      <span className={`${styles.tag} px-3 py-1 rounded-full text-xs`}>{post.category}</span>
                      <span className={`${styles.cardMeta} text-sm`}>{post.readTime} read</span>
                    </div>
                    <h2 className={`${styles.cardTitle} text-xl font-semibold mb-2`}>{post.title}</h2>
                    <p className={`${styles.cardExcerpt} mb-4`}>{post.excerpt}</p>
                    <span className={`${styles.cardMeta} text-sm`}>{post.date}</span>
                  </article>
                ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-72 shrink-0 hidden lg:block">
            <div className={`${styles.sidebar} p-6 sticky top-24`}>
              <h3 className={`${styles.cardTitle} font-semibold mb-4`}>Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'CSS', 'Node.js', 'Testing', 'Performance'].map((tag) => (
                  <span key={tag} className={`${styles.tag} px-3 py-1 rounded-full text-xs cursor-pointer`}>
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className={`${styles.cardTitle} font-semibold mt-8 mb-4`}>Newsletter</h3>
              <p className={`${styles.cardMeta} text-sm mb-3`}>Get weekly updates</p>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-3 py-2 rounded border border-current/20 bg-transparent mb-2"
              />
              <button className={`${styles.tag} w-full py-2 rounded font-medium`}>Subscribe</button>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className={`${styles.footer} py-8 mt-12`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="opacity-70">© 2024 DevBlog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// ============================================================================
// ARTICLE TEMPLATE
// ============================================================================

const articleVariants = {
  default: {
    container: 'min-h-screen bg-white',
    header: 'bg-white border-b border-gray-200',
    nav: 'text-gray-600 hover:text-gray-900',
    title: 'text-gray-900',
    meta: 'text-gray-500',
    content: 'text-gray-700 prose prose-lg max-w-none',
    sidebar: 'text-gray-600',
    tag: 'bg-gray-100 text-gray-700',
    author: 'bg-gray-50 border border-gray-200',
    related: 'bg-gray-50',
  },
  dark: {
    container: 'min-h-screen bg-gray-900',
    header: 'bg-gray-800 border-b border-gray-700',
    nav: 'text-gray-400 hover:text-white',
    title: 'text-white',
    meta: 'text-gray-400',
    content: 'text-gray-300 prose prose-invert prose-lg max-w-none',
    sidebar: 'text-gray-400',
    tag: 'bg-gray-800 text-gray-300',
    author: 'bg-gray-800 border border-gray-700',
    related: 'bg-gray-800',
  },
  brutal: {
    container: 'min-h-screen bg-white',
    header: 'bg-yellow-300 border-b-4 border-black',
    nav: 'text-black hover:bg-black hover:text-white px-2',
    title: 'text-black font-black',
    meta: 'text-gray-600 font-mono',
    content: 'text-gray-800 prose prose-lg max-w-none',
    sidebar: 'text-black',
    tag: 'bg-yellow-300 text-black border-2 border-black',
    author: 'bg-white border-4 border-black shadow-[4px_4px_0_0_#000]',
    related: 'bg-yellow-100 border-t-4 border-black',
  },
  neon: {
    container: 'min-h-screen bg-gray-950',
    header: 'bg-black border-b border-cyan-500/30',
    nav: 'text-cyan-400 hover:text-cyan-300',
    title: 'text-cyan-400 drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]',
    meta: 'text-purple-400',
    content: 'text-gray-300 prose prose-invert prose-lg max-w-none prose-headings:text-cyan-400 prose-a:text-cyan-400',
    sidebar: 'text-cyan-400',
    tag: 'bg-cyan-900/50 text-cyan-300 border border-cyan-500/50',
    author: 'bg-gray-900 border border-purple-500/30',
    related: 'bg-gray-900/50',
  },
  glass: {
    container: 'min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900',
    header: 'bg-white/10 border-b border-white/20 backdrop-blur-xl',
    nav: 'text-white/70 hover:text-white',
    title: 'text-white',
    meta: 'text-white/50',
    content: 'text-white/80 prose prose-invert prose-lg max-w-none',
    sidebar: 'text-white/70',
    tag: 'bg-white/20 text-white',
    author: 'bg-white/10 border border-white/20 backdrop-blur-xl',
    related: 'bg-white/5 backdrop-blur-xl',
  },
};

interface ArticleTemplateProps {
  variant?: keyof typeof articleVariants;
}

export const ArticleTemplate: React.FC<ArticleTemplateProps> = ({ variant = 'default' }) => {
  const styles = articleVariants[variant];
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div className="h-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* Header */}
      <header className={`${styles.header} sticky top-0 z-40`}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a className={`${styles.nav} cursor-pointer`}>← Back to Blog</a>
          <div className="flex gap-4">
            <button className={`${styles.nav} cursor-pointer`}>Share</button>
            <button className={`${styles.nav} cursor-pointer`}>Bookmark</button>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <div className="flex gap-2 mb-4">
            {['React', 'Tutorial'].map((tag) => (
              <span key={tag} className={`${styles.tag} px-3 py-1 rounded-full text-sm`}>{tag}</span>
            ))}
          </div>
          <h1 className={`${styles.title} text-4xl md:text-5xl font-bold mb-6 leading-tight`}>
            Building Modern React Applications with TypeScript
          </h1>
          <div className={`${styles.meta} flex flex-wrap items-center gap-4`}>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
              <span>Jane Developer</span>
            </div>
            <span>•</span>
            <span>December 25, 2024</span>
            <span>•</span>
            <span>15 min read</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-12 flex items-center justify-center">
          <span className="text-white/50 text-lg">Featured Image</span>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <p className="text-xl leading-relaxed mb-6">
            React has evolved significantly over the years, and with TypeScript becoming the industry standard
            for type-safe JavaScript development, combining these two technologies has never been more powerful.
          </p>

          <h2 className={`${styles.title} text-2xl font-bold mt-12 mb-4`}>Getting Started</h2>
          <p className="mb-4">
            Setting up a new React project with TypeScript is straightforward with modern tooling.
            Vite provides an excellent developer experience with instant HMR and optimized builds.
          </p>

          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
            <code>npm create vite@latest my-app -- --template react-ts</code>
          </div>

          <h2 className={`${styles.title} text-2xl font-bold mt-12 mb-4`}>Component Patterns</h2>
          <p className="mb-4">
            TypeScript enables powerful patterns for component development. Generic components,
            discriminated unions, and proper prop typing lead to self-documenting code.
          </p>

          <blockquote className="border-l-4 border-blue-500 pl-6 my-8 italic">
            "TypeScript is JavaScript that scales. It helps teams move fast while maintaining confidence in their code."
          </blockquote>

          <h2 className={`${styles.title} text-2xl font-bold mt-12 mb-4`}>Conclusion</h2>
          <p>
            The combination of React and TypeScript provides a robust foundation for building
            maintainable applications. Start small, iterate often, and let the type system guide you.
          </p>
        </div>

        {/* Author Box */}
        <div className={`${styles.author} rounded-xl p-6 mt-12 flex items-start gap-4`}>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shrink-0" />
          <div>
            <h3 className={`${styles.title} font-semibold text-lg`}>Jane Developer</h3>
            <p className={`${styles.meta} text-sm mb-2`}>Senior Frontend Engineer</p>
            <p className={styles.sidebar}>
              Writing about React, TypeScript, and modern web development. Building tools that make developers' lives easier.
            </p>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className={`${styles.related} py-12 mt-12`}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className={`${styles.title} text-2xl font-bold mb-8`}>Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="cursor-pointer group">
                <div className="aspect-video bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg mb-3 group-hover:opacity-90 transition-opacity" />
                <h3 className={`${styles.title} font-semibold group-hover:text-blue-500 transition-colors`}>
                  Related Article Title {i}
                </h3>
                <p className={`${styles.meta} text-sm`}>5 min read</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// GALLERY TEMPLATE
// ============================================================================

const galleryVariants = {
  default: {
    container: 'min-h-screen bg-gray-100',
    header: 'bg-white border-b border-gray-200',
    nav: 'text-gray-600 hover:text-gray-900',
    title: 'text-gray-900',
    subtitle: 'text-gray-500',
    card: 'bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-shadow',
    cardTitle: 'text-gray-900',
    cardMeta: 'text-gray-500',
    filter: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    filterActive: 'bg-gray-900 text-white',
    modal: 'bg-white',
  },
  dark: {
    container: 'min-h-screen bg-gray-950',
    header: 'bg-gray-900 border-b border-gray-800',
    nav: 'text-gray-400 hover:text-white',
    title: 'text-white',
    subtitle: 'text-gray-400',
    card: 'bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-600 transition-colors',
    cardTitle: 'text-white',
    cardMeta: 'text-gray-400',
    filter: 'bg-gray-800 text-gray-300 hover:bg-gray-700',
    filterActive: 'bg-white text-gray-900',
    modal: 'bg-gray-900',
  },
  brutal: {
    container: 'min-h-screen bg-lime-50',
    header: 'bg-white border-b-4 border-black',
    nav: 'text-black hover:bg-lime-300 px-2',
    title: 'text-black font-black uppercase',
    subtitle: 'text-gray-600 font-mono',
    card: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all',
    cardTitle: 'text-black font-black',
    cardMeta: 'text-gray-600 font-mono',
    filter: 'bg-white text-black border-2 border-black hover:bg-lime-300',
    filterActive: 'bg-black text-white border-2 border-black',
    modal: 'bg-white border-4 border-black',
  },
  neon: {
    container: 'min-h-screen bg-black',
    header: 'bg-black/80 border-b border-pink-500/30 backdrop-blur-xl',
    nav: 'text-pink-400 hover:text-pink-300 hover:drop-shadow-[0_0_8px_rgba(255,0,128,0.8)]',
    title: 'text-pink-400 drop-shadow-[0_0_20px_rgba(255,0,128,0.5)]',
    subtitle: 'text-cyan-400',
    card: 'bg-gray-900/50 rounded-lg overflow-hidden border border-pink-500/30 hover:border-pink-400 hover:shadow-[0_0_40px_rgba(255,0,128,0.3)] transition-all',
    cardTitle: 'text-pink-300',
    cardMeta: 'text-cyan-400',
    filter: 'bg-gray-900 text-pink-400 border border-pink-500/30 hover:border-pink-400',
    filterActive: 'bg-pink-500 text-white border border-pink-500 shadow-[0_0_20px_rgba(255,0,128,0.5)]',
    modal: 'bg-gray-900 border border-pink-500/50',
  },
  glass: {
    container: 'min-h-screen bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900',
    header: 'bg-white/10 border-b border-white/20 backdrop-blur-xl',
    nav: 'text-white/70 hover:text-white',
    title: 'text-white',
    subtitle: 'text-white/50',
    card: 'bg-white/10 rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-colors backdrop-blur',
    cardTitle: 'text-white',
    cardMeta: 'text-white/50',
    filter: 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20',
    filterActive: 'bg-white/30 text-white border border-white/40',
    modal: 'bg-white/10 border border-white/20 backdrop-blur-xl',
  },
};

interface GalleryTemplateProps {
  variant?: keyof typeof galleryVariants;
}

export const GalleryTemplate: React.FC<GalleryTemplateProps> = ({ variant = 'default' }) => {
  const styles = galleryVariants[variant];
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    { id: 1, title: 'Mountain Sunrise', category: 'nature', aspect: 'landscape' },
    { id: 2, title: 'City Lights', category: 'urban', aspect: 'portrait' },
    { id: 3, title: 'Abstract Flow', category: 'abstract', aspect: 'square' },
    { id: 4, title: 'Ocean Waves', category: 'nature', aspect: 'landscape' },
    { id: 5, title: 'Street Scene', category: 'urban', aspect: 'portrait' },
    { id: 6, title: 'Color Study', category: 'abstract', aspect: 'square' },
    { id: 7, title: 'Forest Path', category: 'nature', aspect: 'portrait' },
    { id: 8, title: 'Skyline', category: 'urban', aspect: 'landscape' },
    { id: 9, title: 'Geometric', category: 'abstract', aspect: 'square' },
  ];

  const categories = ['all', 'nature', 'urban', 'abstract'];
  const filteredImages = filter === 'all' ? images : images.filter((img) => img.category === filter);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={`${styles.header} sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className={`${styles.title} text-xl font-bold`}>Gallery</span>
          <nav className="flex gap-6">
            {['Portfolio', 'Collections', 'About', 'Contact'].map((item) => (
              <a key={item} className={`${styles.nav} cursor-pointer transition-colors`}>{item}</a>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className={`${styles.title} text-4xl md:text-5xl font-bold mb-4`}>Photo Gallery</h1>
          <p className={styles.subtitle}>A curated collection of photography and digital art</p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full capitalize transition-all ${
                filter === cat ? styles.filterActive : styles.filter
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className={`${styles.card} mb-6 break-inside-avoid cursor-pointer group`}
              onClick={() => setSelectedImage(img.id)}
            >
              <div
                className={`bg-gradient-to-br from-gray-400 to-gray-500 ${
                  img.aspect === 'landscape' ? 'aspect-video' : img.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
                }`}
              >
                <div className="w-full h-full flex items-center justify-center text-white/30 group-hover:text-white/50 transition-colors">
                  {img.title}
                </div>
              </div>
              <div className="p-4">
                <h3 className={`${styles.cardTitle} font-semibold`}>{img.title}</h3>
                <p className={`${styles.cardMeta} text-sm capitalize`}>{img.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div className={`${styles.modal} max-w-4xl w-full rounded-xl overflow-hidden`} onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
              <span className="text-white/50">Full Image View</span>
            </div>
            <div className="p-6">
              <h2 className={`${styles.cardTitle} text-xl font-bold mb-2`}>
                {images.find((i) => i.id === selectedImage)?.title}
              </h2>
              <p className={styles.cardMeta}>
                Category: {images.find((i) => i.id === selectedImage)?.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// DOCUMENTATION TEMPLATE
// ============================================================================

const docsVariants = {
  default: {
    container: 'min-h-screen bg-white',
    header: 'bg-white border-b border-gray-200',
    nav: 'text-gray-600 hover:text-gray-900',
    search: 'bg-gray-100 border border-gray-200',
    sidebar: 'bg-gray-50 border-r border-gray-200',
    sidebarLink: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
    sidebarActive: 'text-blue-600 bg-blue-50 border-l-2 border-blue-600',
    title: 'text-gray-900',
    content: 'text-gray-700',
    code: 'bg-gray-100 border border-gray-200',
    toc: 'text-gray-500 hover:text-gray-900',
    tocActive: 'text-blue-600',
  },
  dark: {
    container: 'min-h-screen bg-gray-950',
    header: 'bg-gray-900 border-b border-gray-800',
    nav: 'text-gray-400 hover:text-white',
    search: 'bg-gray-800 border border-gray-700',
    sidebar: 'bg-gray-900 border-r border-gray-800',
    sidebarLink: 'text-gray-400 hover:text-white hover:bg-gray-800',
    sidebarActive: 'text-blue-400 bg-blue-900/30 border-l-2 border-blue-400',
    title: 'text-white',
    content: 'text-gray-300',
    code: 'bg-gray-900 border border-gray-700',
    toc: 'text-gray-500 hover:text-white',
    tocActive: 'text-blue-400',
  },
  brutal: {
    container: 'min-h-screen bg-white',
    header: 'bg-yellow-300 border-b-4 border-black',
    nav: 'text-black hover:bg-black hover:text-white px-2',
    search: 'bg-white border-4 border-black',
    sidebar: 'bg-yellow-50 border-r-4 border-black',
    sidebarLink: 'text-black hover:bg-yellow-200',
    sidebarActive: 'bg-black text-white',
    title: 'text-black font-black',
    content: 'text-gray-800',
    code: 'bg-yellow-100 border-4 border-black',
    toc: 'text-gray-600 hover:text-black',
    tocActive: 'text-black font-bold',
  },
  neon: {
    container: 'min-h-screen bg-gray-950',
    header: 'bg-black border-b border-green-500/30',
    nav: 'text-green-400 hover:text-green-300',
    search: 'bg-gray-900 border border-green-500/30',
    sidebar: 'bg-gray-900/50 border-r border-green-500/20',
    sidebarLink: 'text-green-400/70 hover:text-green-300 hover:bg-green-900/20',
    sidebarActive: 'text-green-400 bg-green-900/30 border-l-2 border-green-400 shadow-[0_0_10px_rgba(0,255,0,0.2)]',
    title: 'text-green-400 drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]',
    content: 'text-gray-300',
    code: 'bg-gray-900 border border-green-500/30',
    toc: 'text-green-500/50 hover:text-green-400',
    tocActive: 'text-green-400',
  },
  glass: {
    container: 'min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900',
    header: 'bg-white/10 border-b border-white/20 backdrop-blur-xl',
    nav: 'text-white/70 hover:text-white',
    search: 'bg-white/10 border border-white/20 backdrop-blur',
    sidebar: 'bg-white/5 border-r border-white/10',
    sidebarLink: 'text-white/60 hover:text-white hover:bg-white/10',
    sidebarActive: 'text-white bg-white/20 border-l-2 border-white',
    title: 'text-white',
    content: 'text-white/80',
    code: 'bg-white/10 border border-white/20 backdrop-blur',
    toc: 'text-white/40 hover:text-white',
    tocActive: 'text-white',
  },
};

interface DocumentationTemplateProps {
  variant?: keyof typeof docsVariants;
}

export const DocumentationTemplate: React.FC<DocumentationTemplateProps> = ({ variant = 'default' }) => {
  const styles = docsVariants[variant];
  const [activePage, setActivePage] = useState('getting-started');

  const navigation = [
    { section: 'Getting Started', items: [
      { id: 'getting-started', label: 'Introduction' },
      { id: 'installation', label: 'Installation' },
      { id: 'quick-start', label: 'Quick Start' },
    ]},
    { section: 'Core Concepts', items: [
      { id: 'components', label: 'Components' },
      { id: 'styling', label: 'Styling' },
      { id: 'state', label: 'State Management' },
    ]},
    { section: 'API Reference', items: [
      { id: 'hooks', label: 'Hooks' },
      { id: 'utilities', label: 'Utilities' },
      { id: 'types', label: 'TypeScript Types' },
    ]},
  ];

  const toc = ['Overview', 'Prerequisites', 'Installation Steps', 'Next Steps'];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={`${styles.header} sticky top-0 z-40`}>
        <div className="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className={`${styles.title} text-xl font-bold`}>Docs</span>
            <div className={`${styles.search} rounded-lg px-4 py-2 flex items-center gap-2 w-64`}>
              <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="opacity-50 text-sm">Search docs...</span>
              <span className="ml-auto text-xs opacity-50">⌘K</span>
            </div>
          </div>
          <nav className="flex gap-6">
            {['Guides', 'API', 'Examples', 'GitHub'].map((item) => (
              <a key={item} className={`${styles.nav} cursor-pointer transition-colors`}>{item}</a>
            ))}
          </nav>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${styles.sidebar} w-64 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto`}>
          <nav className="p-6">
            {navigation.map((group) => (
              <div key={group.section} className="mb-6">
                <h3 className={`${styles.title} text-sm font-semibold mb-2 uppercase tracking-wider`}>
                  {group.section}
                </h3>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActivePage(item.id)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                          activePage === item.id ? styles.sidebarActive : styles.sidebarLink
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-12 py-10">
          <div className="max-w-3xl">
            <h1 className={`${styles.title} text-4xl font-bold mb-4`}>Introduction</h1>
            <p className={`${styles.content} text-lg mb-8`}>
              Welcome to the documentation. This guide will help you get started with our library
              and understand its core concepts.
            </p>

            <h2 id="overview" className={`${styles.title} text-2xl font-semibold mt-12 mb-4`}>Overview</h2>
            <p className={`${styles.content} mb-4`}>
              Our library provides a comprehensive set of components and utilities for building
              modern web applications. It's built with TypeScript and follows best practices for
              accessibility and performance.
            </p>

            <h2 id="prerequisites" className={`${styles.title} text-2xl font-semibold mt-12 mb-4`}>Prerequisites</h2>
            <ul className={`${styles.content} list-disc pl-6 mb-4 space-y-2`}>
              <li>Node.js 18 or later</li>
              <li>React 18 or later</li>
              <li>TypeScript 5.0+ (recommended)</li>
            </ul>

            <h2 id="installation" className={`${styles.title} text-2xl font-semibold mt-12 mb-4`}>Installation Steps</h2>
            <div className={`${styles.code} rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto`}>
              <div className="opacity-50 mb-2"># Using npm</div>
              <div>npm install @library/core</div>
              <div className="opacity-50 mt-4 mb-2"># Using yarn</div>
              <div>yarn add @library/core</div>
            </div>

            <h2 id="next-steps" className={`${styles.title} text-2xl font-semibold mt-12 mb-4`}>Next Steps</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {['Quick Start Guide', 'Component Overview', 'API Reference', 'Examples'].map((item) => (
                <a
                  key={item}
                  className={`${styles.code} rounded-lg p-4 cursor-pointer hover:opacity-80 transition-opacity block`}
                >
                  <span className={styles.title}>{item} →</span>
                </a>
              ))}
            </div>
          </div>
        </main>

        {/* Table of Contents */}
        <aside className="w-48 shrink-0 hidden xl:block sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <nav className="p-6">
            <h4 className={`${styles.title} text-sm font-semibold mb-3`}>On this page</h4>
            <ul className="space-y-2 text-sm">
              {toc.map((item, i) => (
                <li key={item}>
                  <a className={`${i === 0 ? styles.tocActive : styles.toc} cursor-pointer transition-colors`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
};

// ============================================================================
// REGISTRY ENTRIES
// ============================================================================

const createContentEntry = (
  id: string,
  name: string,
  description: string,
  sections: string[],
  tags: string[],
  component: React.FC<any>,
  composedOf: string[] = []
): TemplateEntry => ({
  id: `tpl-cnt-${id}`,
  name,
  layer: 'template',
  category: 'content',
  description,
  sections,
  composedOf,
  themeAgnostic: false,
  sourceComponents: ['custom'],
  extractedFrom: 'src/elements/templates/content/index.tsx',
  previewType: 'fullwidth',
  hasInteraction: true,
  implementation: 'component',
  component,
  codeSnippet: `<${name.replace(/\s/g, '')} />`,
  tags: ['template', 'content', 'page', ...tags],
});

export const contentTemplateRegistry: TemplateEntry[] = [
  // Blog List Template
  createContentEntry(
    'blog-list',
    'Blog List Template',
    'Blog listing page with category filtering and sidebar',
    ['header', 'hero', 'filter', 'posts-grid', 'sidebar', 'footer'],
    ['blog', 'list', 'articles', 'posts', 'categories'],
    BlogListTemplate,
    ['org-nav-navbar', 'org-layout-hero', 'mol-btn-filter', 'mol-card-article', 'org-layout-footer']
  ),
  createContentEntry(
    'blog-list-dark',
    'Blog List Template (Dark)',
    'Dark theme blog listing page',
    ['header', 'hero', 'filter', 'posts-grid', 'sidebar', 'footer'],
    ['blog', 'list', 'dark'],
    (props) => <BlogListTemplate {...props} variant="dark" />,
    ['org-nav-navbar', 'mol-card-article']
  ),
  createContentEntry(
    'blog-list-brutal',
    'Blog List Template (Brutal)',
    'Neo-brutalist blog listing page',
    ['header', 'hero', 'filter', 'posts-grid', 'sidebar', 'footer'],
    ['blog', 'list', 'brutal', 'neo-brutalist'],
    (props) => <BlogListTemplate {...props} variant="brutal" />,
    ['org-nav-navbar', 'mol-card-article']
  ),
  createContentEntry(
    'blog-list-neon',
    'Blog List Template (Neon)',
    'Cyberpunk neon blog listing page',
    ['header', 'hero', 'filter', 'posts-grid', 'sidebar', 'footer'],
    ['blog', 'list', 'neon', 'cyberpunk'],
    (props) => <BlogListTemplate {...props} variant="neon" />,
    ['org-nav-navbar', 'mol-card-article']
  ),

  // Article Template
  createContentEntry(
    'article',
    'Article Template',
    'Long-form article page with progress bar and author info',
    ['progress', 'header', 'hero-image', 'content', 'author', 'related'],
    ['article', 'blog', 'post', 'reading'],
    ArticleTemplate,
    ['org-nav-navbar', 'org-layout-hero', 'mol-card-author', 'org-layout-related']
  ),
  createContentEntry(
    'article-dark',
    'Article Template (Dark)',
    'Dark theme article page',
    ['progress', 'header', 'hero-image', 'content', 'author', 'related'],
    ['article', 'dark'],
    (props) => <ArticleTemplate {...props} variant="dark" />,
    ['org-nav-navbar', 'mol-card-author']
  ),
  createContentEntry(
    'article-brutal',
    'Article Template (Brutal)',
    'Neo-brutalist article page',
    ['progress', 'header', 'hero-image', 'content', 'author', 'related'],
    ['article', 'brutal', 'neo-brutalist'],
    (props) => <ArticleTemplate {...props} variant="brutal" />,
    ['org-nav-navbar', 'mol-card-author']
  ),
  createContentEntry(
    'article-neon',
    'Article Template (Neon)',
    'Cyberpunk neon article page',
    ['progress', 'header', 'hero-image', 'content', 'author', 'related'],
    ['article', 'neon', 'cyberpunk'],
    (props) => <ArticleTemplate {...props} variant="neon" />,
    ['org-nav-navbar', 'mol-card-author']
  ),

  // Gallery Template
  createContentEntry(
    'gallery',
    'Gallery Template',
    'Photo gallery with filtering and lightbox modal',
    ['header', 'hero', 'filters', 'masonry-grid', 'lightbox'],
    ['gallery', 'photos', 'images', 'portfolio', 'masonry'],
    GalleryTemplate,
    ['org-nav-navbar', 'org-layout-hero', 'mol-btn-filter', 'org-media-gallery', 'org-feedback-modal']
  ),
  createContentEntry(
    'gallery-dark',
    'Gallery Template (Dark)',
    'Dark theme photo gallery',
    ['header', 'hero', 'filters', 'masonry-grid', 'lightbox'],
    ['gallery', 'dark'],
    (props) => <GalleryTemplate {...props} variant="dark" />,
    ['org-nav-navbar', 'org-media-gallery']
  ),
  createContentEntry(
    'gallery-brutal',
    'Gallery Template (Brutal)',
    'Neo-brutalist photo gallery',
    ['header', 'hero', 'filters', 'masonry-grid', 'lightbox'],
    ['gallery', 'brutal', 'neo-brutalist'],
    (props) => <GalleryTemplate {...props} variant="brutal" />,
    ['org-nav-navbar', 'org-media-gallery']
  ),
  createContentEntry(
    'gallery-neon',
    'Gallery Template (Neon)',
    'Cyberpunk neon photo gallery',
    ['header', 'hero', 'filters', 'masonry-grid', 'lightbox'],
    ['gallery', 'neon', 'cyberpunk'],
    (props) => <GalleryTemplate {...props} variant="neon" />,
    ['org-nav-navbar', 'org-media-gallery']
  ),

  // Documentation Template
  createContentEntry(
    'documentation',
    'Documentation Template',
    'Technical documentation with sidebar navigation and ToC',
    ['header', 'search', 'sidebar', 'content', 'toc'],
    ['docs', 'documentation', 'api', 'reference', 'guide'],
    DocumentationTemplate,
    ['org-nav-navbar', 'org-nav-sidebar', 'mol-input-search', 'org-data-toc']
  ),
  createContentEntry(
    'documentation-dark',
    'Documentation Template (Dark)',
    'Dark theme documentation page',
    ['header', 'search', 'sidebar', 'content', 'toc'],
    ['docs', 'documentation', 'dark'],
    (props) => <DocumentationTemplate {...props} variant="dark" />,
    ['org-nav-navbar', 'org-nav-sidebar']
  ),
  createContentEntry(
    'documentation-brutal',
    'Documentation Template (Brutal)',
    'Neo-brutalist documentation page',
    ['header', 'search', 'sidebar', 'content', 'toc'],
    ['docs', 'documentation', 'brutal', 'neo-brutalist'],
    (props) => <DocumentationTemplate {...props} variant="brutal" />,
    ['org-nav-navbar', 'org-nav-sidebar']
  ),
  createContentEntry(
    'documentation-neon',
    'Documentation Template (Neon)',
    'Cyberpunk neon documentation page',
    ['header', 'search', 'sidebar', 'content', 'toc'],
    ['docs', 'documentation', 'neon', 'cyberpunk'],
    (props) => <DocumentationTemplate {...props} variant="neon" />,
    ['org-nav-navbar', 'org-nav-sidebar']
  ),
];

