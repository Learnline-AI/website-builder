import React, { useEffect, useRef, useState } from 'react';

// ============================================================================
// SHARED HOOKS AND UTILITIES
// ============================================================================

/**
 * Custom hook for Intersection Observer with threshold options
 */
const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLDivElement | null>, boolean, number] => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        setRatio(entry.intersectionRatio);
      },
      {
        threshold: options.threshold || [0, 0.25, 0.5, 0.75, 1],
        rootMargin: options.rootMargin || '0px',
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible, ratio];
};

/**
 * Custom hook for scroll position tracking
 */
const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollY(currentScrollY);
      setScrollProgress(maxScroll > 0 ? currentScrollY / maxScroll : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, scrollProgress };
};

/**
 * Custom hook for counting animation
 */
const useCountUp = (
  end: number,
  duration: number = 2000,
  start: number = 0,
  shouldStart: boolean = false
): number => {
  const [count, setCount] = useState(start);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!shouldStart) {
      setCount(start);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(start + (end - start) * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      startTimeRef.current = null;
    };
  }, [shouldStart, end, duration, start]);

  return count;
};

// ============================================================================
// SCROLL EFFECT WRAPPER COMPONENTS
// ============================================================================

interface ScrollEffectProps {
  children: React.ReactNode;
}

// --- 1. SCROLL FADE IN ---
const ScrollFadeInWrapper: React.FC<ScrollEffectProps> = ({ children }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      {children}
    </div>
  );
};

// --- 2. SCROLL SLIDE UP ---
const ScrollSlideUpWrapper: React.FC<ScrollEffectProps> = ({ children }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
      }}
    >
      {children}
    </div>
  );
};

// --- 3. SCROLL SLIDE LEFT ---
const ScrollSlideLeftWrapper: React.FC<ScrollEffectProps> = ({ children }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-80px)',
      }}
    >
      {children}
    </div>
  );
};

// --- 4. SCROLL SLIDE RIGHT ---
const ScrollSlideRightWrapper: React.FC<ScrollEffectProps> = ({ children }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(80px)',
      }}
    >
      {children}
    </div>
  );
};

// --- 5. SCROLL SCALE IN ---
const ScrollScaleInWrapper: React.FC<ScrollEffectProps> = ({ children }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.7)',
      }}
    >
      {children}
    </div>
  );
};

// --- 6. SCROLL ROTATE IN ---
const ScrollRotateInWrapper: React.FC<ScrollEffectProps> = ({ children }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'rotate(0deg) scale(1)' : 'rotate(-10deg) scale(0.9)',
      }}
    >
      {children}
    </div>
  );
};

// --- 7. SCROLL PARALLAX SLOW ---
const ScrollParallaxSlowWrapper: React.FC<ScrollEffectProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elementCenter - windowHeight / 2;
      setOffset(distanceFromCenter * 0.15); // Slow parallax factor
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

// --- 8. SCROLL PARALLAX FAST ---
const ScrollParallaxFastWrapper: React.FC<ScrollEffectProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elementCenter - windowHeight / 2;
      setOffset(distanceFromCenter * 0.4); // Fast parallax factor
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

// --- 9. SCROLL STICKY REVEAL ---
const ScrollStickyRevealWrapper: React.FC<ScrollEffectProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealProgress, setRevealProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const totalScroll = rect.height - windowHeight;
        const scrolled = -rect.top;
        setRevealProgress(Math.min(1, Math.max(0, scrolled / totalScroll)));
      } else if (rect.top > 0) {
        setRevealProgress(0);
      } else {
        setRevealProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div
          style={{
            clipPath: `inset(${(1 - revealProgress) * 50}% 0)`,
            transition: 'clip-path 0.1s ease-out',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// --- 10. SCROLL PROGRESS BAR ---
const ScrollProgressBarWrapper: React.FC<ScrollEffectProps> = ({ children }) => {
  const { scrollProgress } = useScrollPosition();

  return (
    <div className="relative">
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50"
        style={{
          width: `${scrollProgress * 100}%`,
          transition: 'width 0.1s ease-out',
        }}
      />
      {children}
    </div>
  );
};

// --- 11. SCROLL COUNTER UP ---
const ScrollCounterUpWrapper: React.FC<ScrollEffectProps> = ({ children }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  const count = useCountUp(1000, 2000, 0, hasAnimated);

  return (
    <div ref={ref} className="relative">
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 font-mono text-3xl font-bold text-blue-500">
        {count.toLocaleString()}
      </div>
      {children}
    </div>
  );
};

// --- 12. SCROLL TEXT REVEAL ---
const ScrollTextRevealWrapper: React.FC<ScrollEffectProps> = ({ children }) => {
  const [ref, _isVisible, ratio] = useIntersectionObserver({
    threshold: Array.from({ length: 20 }, (_, i) => i / 20),
  });

  const words = ['Scroll', 'to', 'reveal', 'this', 'amazing', 'content', 'word', 'by', 'word'];
  const visibleWords = Math.ceil(ratio * words.length);

  return (
    <div ref={ref} className="relative">
      <div className="absolute -top-12 left-0 right-0 flex flex-wrap gap-2 justify-center">
        {words.map((word, i) => (
          <span
            key={i}
            className="text-lg font-bold transition-all duration-300"
            style={{
              opacity: i < visibleWords ? 1 : 0.2,
              transform: i < visibleWords ? 'translateY(0)' : 'translateY(10px)',
              color: i < visibleWords ? '#3b82f6' : '#6b7280',
            }}
          >
            {word}
          </span>
        ))}
      </div>
      {children}
    </div>
  );
};

// ============================================================================
// DEMO COMPONENTS WITH EMBEDDED EFFECTS
// ============================================================================

// --- 1. SCROLL FADE IN DEMO ---
const ScrollFadeIn: React.FC<ScrollEffectProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="h-32" />
        <p className="text-zinc-400 text-center text-sm">Scroll down to see elements fade in</p>

        <ScrollFadeInWrapper>
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">Fade In Effect</h2>
            <p className="text-blue-100">This card fades in smoothly as you scroll into view.</p>
          </div>
        </ScrollFadeInWrapper>

        <div className="h-32" />

        <ScrollFadeInWrapper>
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">Another Card</h2>
            <p className="text-purple-100">Keep scrolling to see more elements appear.</p>
          </div>
        </ScrollFadeInWrapper>

        <div className="h-32" />

        <ScrollFadeInWrapper>
          <div className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">Final Card</h2>
            <p className="text-pink-100">Subtle, elegant fade-in animations.</p>
          </div>
        </ScrollFadeInWrapper>

        <div className="h-32" />
        {children}
      </div>
    </div>
  );
};

// --- 2. SCROLL SLIDE UP DEMO ---
const ScrollSlideUp: React.FC<ScrollEffectProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="h-32" />
        <p className="text-slate-400 text-center text-sm">Scroll down to see elements slide up</p>

        {[1, 2, 3].map((i) => (
          <React.Fragment key={i}>
            <ScrollSlideUpWrapper>
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    {i}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Slide Up Card {i}</h3>
                    <p className="text-emerald-100">Elements slide up from below the viewport.</p>
                  </div>
                </div>
              </div>
            </ScrollSlideUpWrapper>
            <div className="h-24" />
          </React.Fragment>
        ))}

        <div className="h-32" />
        {children}
      </div>
    </div>
  );
};

// --- 3. SCROLL SLIDE LEFT DEMO ---
const ScrollSlideLeft: React.FC<ScrollEffectProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="h-32" />
        <p className="text-indigo-300 text-center text-sm">Scroll down to see elements slide from the left</p>

        {['Feature A', 'Feature B', 'Feature C'].map((feature, i) => (
          <React.Fragment key={i}>
            <ScrollSlideLeftWrapper>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{'->'.charAt(i % 2)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{feature}</h3>
                    <p className="text-indigo-200">Slides in from the left side.</p>
                  </div>
                </div>
              </div>
            </ScrollSlideLeftWrapper>
            <div className="h-24" />
          </React.Fragment>
        ))}

        <div className="h-32" />
        {children}
      </div>
    </div>
  );
};

// --- 4. SCROLL SLIDE RIGHT DEMO ---
const ScrollSlideRight: React.FC<ScrollEffectProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-900 via-rose-800 to-rose-900 p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="h-32" />
        <p className="text-rose-300 text-center text-sm">Scroll down to see elements slide from the right</p>

        {['Step 1', 'Step 2', 'Step 3'].map((step, i) => (
          <React.Fragment key={i}>
            <ScrollSlideRightWrapper>
              <div className="bg-gradient-to-l from-rose-500/30 to-transparent rounded-xl p-6 border-r-4 border-rose-400">
                <h3 className="text-xl font-bold text-white">{step}</h3>
                <p className="text-rose-200 mt-2">Content slides in from the right side of the screen.</p>
              </div>
            </ScrollSlideRightWrapper>
            <div className="h-24" />
          </React.Fragment>
        ))}

        <div className="h-32" />
        {children}
      </div>
    </div>
  );
};

// --- 5. SCROLL SCALE IN DEMO ---
const ScrollScaleIn: React.FC<ScrollEffectProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 via-cyan-800 to-cyan-900 p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="h-32" />
        <p className="text-cyan-300 text-center text-sm">Scroll down to see elements scale up</p>

        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <ScrollScaleInWrapper>
                <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-6 aspect-square flex items-center justify-center shadow-2xl">
                  <span className="text-4xl font-bold text-white">{i}</span>
                </div>
              </ScrollScaleInWrapper>
            </React.Fragment>
          ))}
        </div>

        <div className="h-24" />

        <ScrollScaleInWrapper>
          <div className="bg-white/10 backdrop-blur rounded-3xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white">Scale Effect</h2>
            <p className="text-cyan-200 mt-2">Elements grow from small to full size.</p>
          </div>
        </ScrollScaleInWrapper>

        <div className="h-32" />
        {children}
      </div>
    </div>
  );
};

// --- 6. SCROLL ROTATE IN DEMO ---
const ScrollRotateIn: React.FC<ScrollEffectProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-900 via-violet-800 to-violet-900 p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="h-32" />
        <p className="text-violet-300 text-center text-sm">Scroll down to see elements rotate in</p>

        {[0, 1, 2].map((i) => (
          <React.Fragment key={i}>
            <ScrollRotateInWrapper>
              <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl p-8 shadow-2xl transform-gpu">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" fill="none" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Rotate Effect {i + 1}</h3>
                    <p className="text-violet-100">Elements rotate and scale into view.</p>
                  </div>
                </div>
              </div>
            </ScrollRotateInWrapper>
            <div className="h-24" />
          </React.Fragment>
        ))}

        <div className="h-32" />
        {children}
      </div>
    </div>
  );
};

// --- 7. SCROLL PARALLAX SLOW DEMO ---
const ScrollParallaxSlow: React.FC<ScrollEffectProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 via-sky-800 to-sky-900 p-8 overflow-y-auto relative">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="h-24" />
        <p className="text-sky-300 text-center text-sm">Scroll to see slow parallax effect</p>

        <div className="relative h-96">
          <ScrollParallaxSlowWrapper>
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/30 to-blue-500/30 rounded-3xl" />
          </ScrollParallaxSlowWrapper>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white">Slow Parallax</h2>
              <p className="text-sky-200 mt-2">Background moves slower than foreground.</p>
            </div>
          </div>
        </div>

        <ScrollParallaxSlowWrapper>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-sky-500/30 backdrop-blur rounded-xl p-6 text-center">
                <span className="text-4xl font-bold text-white">{i}</span>
              </div>
            ))}
          </div>
        </ScrollParallaxSlowWrapper>

        <div className="h-64" />
        {children}
      </div>
    </div>
  );
};

// --- 8. SCROLL PARALLAX FAST DEMO ---
const ScrollParallaxFast: React.FC<ScrollEffectProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 p-8 overflow-y-auto relative">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="h-24" />
        <p className="text-amber-300 text-center text-sm">Scroll to see fast parallax effect</p>

        <div className="relative h-96">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-3xl" />

          <ScrollParallaxFastWrapper>
            <div className="absolute inset-8 flex items-center justify-center">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-center shadow-2xl">
                <h2 className="text-3xl font-bold text-white">Fast Parallax</h2>
                <p className="text-amber-100 mt-2">This element moves faster on scroll.</p>
              </div>
            </div>
          </ScrollParallaxFastWrapper>
        </div>

        <ScrollParallaxFastWrapper>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white">Accelerated Motion</h3>
            <p className="text-orange-100">Creates depth and dynamic movement.</p>
          </div>
        </ScrollParallaxFastWrapper>

        <div className="h-64" />
        {children}
      </div>
    </div>
  );
};

// --- 9. SCROLL STICKY REVEAL DEMO ---
const ScrollStickyReveal: React.FC<ScrollEffectProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="h-screen flex items-center justify-center">
          <p className="text-zinc-400 text-center">Scroll down to see the sticky reveal effect</p>
        </div>

        <ScrollStickyRevealWrapper>
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-12 text-center shadow-2xl max-w-xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">Sticky Reveal</h2>
            <p className="text-emerald-100 text-lg">
              This content is revealed as you scroll through the sticky section.
              The clip-path animates to unveil the content progressively.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/20 rounded-xl p-4">
                  <span className="text-2xl font-bold text-white">{i}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollStickyRevealWrapper>

        <div className="h-screen flex items-center justify-center">
          <p className="text-zinc-400 text-center">End of sticky reveal section</p>
        </div>
        {children}
      </div>
    </div>
  );
};

// --- 10. SCROLL PROGRESS BAR DEMO ---
const ScrollProgressBar: React.FC<ScrollEffectProps> = ({ children }) => {
  return (
    <ScrollProgressBarWrapper>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="h-16" />
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-2">Scroll Progress Bar</h2>
            <p className="text-gray-400">
              Notice the progress bar at the top of the viewport. It shows how far you have scrolled through the page.
            </p>
          </div>

          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white">Section {i + 1}</h3>
              <p className="text-gray-400 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}

          <div className="h-32" />
          {children}
        </div>
      </div>
    </ScrollProgressBarWrapper>
  );
};

// --- 11. SCROLL COUNTER UP DEMO ---
const ScrollCounterUp: React.FC<ScrollEffectProps> = ({ children }) => {
  const [ref1, isVisible1] = useIntersectionObserver({ threshold: 0.5 });
  const [ref2, isVisible2] = useIntersectionObserver({ threshold: 0.5 });
  const [ref3, isVisible3] = useIntersectionObserver({ threshold: 0.5 });

  const [started1, setStarted1] = useState(false);
  const [started2, setStarted2] = useState(false);
  const [started3, setStarted3] = useState(false);

  useEffect(() => { if (isVisible1) setStarted1(true); }, [isVisible1]);
  useEffect(() => { if (isVisible2) setStarted2(true); }, [isVisible2]);
  useEffect(() => { if (isVisible3) setStarted3(true); }, [isVisible3]);

  const count1 = useCountUp(1234, 2000, 0, started1);
  const count2 = useCountUp(567, 1500, 0, started2);
  const count3 = useCountUp(89012, 2500, 0, started3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="h-48" />
        <p className="text-blue-300 text-center text-sm">Scroll down to see counters animate</p>

        <div ref={ref1} className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center shadow-2xl">
          <div className="text-5xl font-bold text-white font-mono">{count1.toLocaleString()}</div>
          <p className="text-blue-200 mt-2">Active Users</p>
        </div>

        <div className="h-32" />

        <div ref={ref2} className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl p-8 text-center shadow-2xl">
          <div className="text-5xl font-bold text-white font-mono">{count2.toLocaleString()}</div>
          <p className="text-purple-200 mt-2">Projects Completed</p>
        </div>

        <div className="h-32" />

        <div ref={ref3} className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 text-center shadow-2xl">
          <div className="text-5xl font-bold text-white font-mono">${count3.toLocaleString()}</div>
          <p className="text-emerald-200 mt-2">Revenue Generated</p>
        </div>

        <div className="h-48" />
        {children}
      </div>
    </div>
  );
};

// --- 12. SCROLL TEXT REVEAL DEMO ---
const ScrollTextReveal: React.FC<ScrollEffectProps> = ({ children }) => {
  const [ref, , ratio] = useIntersectionObserver({
    threshold: Array.from({ length: 20 }, (_, i) => i / 20),
  });

  const text = "Discover the magic of scroll-driven text reveal animations that bring your content to life word by word";
  const words = text.split(' ');
  const visibleWords = Math.ceil(ratio * words.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="h-screen flex items-center justify-center">
          <p className="text-zinc-400 text-center">Scroll down to reveal the text</p>
        </div>

        <div ref={ref} className="min-h-screen flex items-center justify-center py-32">
          <div className="bg-zinc-800/50 backdrop-blur-xl rounded-3xl p-12 border border-zinc-700">
            <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
              {words.map((word, i) => (
                <span
                  key={i}
                  className="text-3xl font-bold transition-all duration-500"
                  style={{
                    opacity: i < visibleWords ? 1 : 0.1,
                    transform: i < visibleWords ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
                    color: i < visibleWords
                      ? `hsl(${200 + (i * 5) % 60}, 80%, 60%)`
                      : '#4b5563',
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Text Revealed!</h2>
            <p className="text-zinc-400">Scroll back up to see the effect again.</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

// Export individual wrapper components for reuse
export {
  ScrollFadeInWrapper,
  ScrollSlideUpWrapper,
  ScrollSlideLeftWrapper,
  ScrollSlideRightWrapper,
  ScrollScaleInWrapper,
  ScrollRotateInWrapper,
  ScrollParallaxSlowWrapper,
  ScrollParallaxFastWrapper,
  ScrollStickyRevealWrapper,
  ScrollProgressBarWrapper,
  ScrollCounterUpWrapper,
  ScrollTextRevealWrapper,
};

// Export custom hooks for reuse
export {
  useIntersectionObserver,
  useScrollPosition,
  useCountUp,
};

// Main export: Record of all scroll effect components
export const scrollEffects: Record<string, React.FC<{ children: React.ReactNode }>> = {
  'scroll-fade-in': ScrollFadeIn,
  'scroll-slide-up': ScrollSlideUp,
  'scroll-slide-left': ScrollSlideLeft,
  'scroll-slide-right': ScrollSlideRight,
  'scroll-scale-in': ScrollScaleIn,
  'scroll-rotate-in': ScrollRotateIn,
  'scroll-parallax-slow': ScrollParallaxSlow,
  'scroll-parallax-fast': ScrollParallaxFast,
  'scroll-sticky-reveal': ScrollStickyReveal,
  'scroll-progress-bar': ScrollProgressBar,
  'scroll-counter-up': ScrollCounterUp,
  'scroll-text-reveal': ScrollTextReveal,
};

export default scrollEffects;
