import React, { useState, useEffect } from 'react';

// Shared prop type for all text effects
interface TextEffectProps {
  children?: React.ReactNode;
  text?: string;
}

// Helper to get text from props
const getText = (props: TextEffectProps): string => {
  if (props.text) return props.text;
  if (typeof props.children === 'string') return props.children;
  return '';
};

// --- 1. TEXT TYPEWRITER ---
const TextTypewriter: React.FC<TextEffectProps> = (props) => {
  const text = getText(props) || 'Hello, World!';
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const restart = () => {
    setDisplayedText('');
    setCurrentIndex(0);
  };

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="font-mono text-xl text-green-400 min-h-[2rem]">
        {displayedText}
        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
      </div>
      <button
        onClick={restart}
        className="mt-4 px-3 py-1 bg-green-600 text-white rounded text-xs font-mono hover:bg-green-500 transition-colors"
      >
        RESTART
      </button>
    </div>
  );
};

// --- 2. TEXT GLITCH ---
const TextGlitch: React.FC<TextEffectProps> = (props) => {
  const text = getText(props) || 'GLITCH';
  const [glitchedText, setGlitchedText] = useState(text);
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const glitched = text.split('').map((char) => {
        if (Math.random() < 0.1) {
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        return char;
      }).join('');
      setGlitchedText(glitched);
    }, 100);

    return () => clearInterval(glitchInterval);
  }, [text]);

  return (
    <div className="h-full bg-black flex items-center justify-center p-4 overflow-hidden">
      <div className="relative">
        {/* Main text */}
        <span className="font-mono text-2xl font-bold text-white relative z-10">
          {glitchedText}
        </span>
        {/* Red offset */}
        <span
          className="absolute inset-0 font-mono text-2xl font-bold text-red-500 opacity-70 animate-pulse"
          style={{ transform: 'translate(-2px, 1px)', clipPath: 'inset(0 0 50% 0)' }}
        >
          {glitchedText}
        </span>
        {/* Cyan offset */}
        <span
          className="absolute inset-0 font-mono text-2xl font-bold text-cyan-500 opacity-70 animate-pulse"
          style={{ transform: 'translate(2px, -1px)', clipPath: 'inset(50% 0 0 0)' }}
        >
          {glitchedText}
        </span>
      </div>
      <style>{`
        @keyframes glitch-skew {
          0%, 100% { transform: skew(0deg); }
          20% { transform: skew(-2deg); }
          40% { transform: skew(2deg); }
          60% { transform: skew(-1deg); }
          80% { transform: skew(1deg); }
        }
      `}</style>
    </div>
  );
};

// --- 3. TEXT GRADIENT FLOW ---
const TextGradientFlow: React.FC<TextEffectProps> = (props) => {
  const text = getText(props) || 'Gradient Flow';

  return (
    <div className="h-full bg-zinc-900 flex items-center justify-center p-4">
      <span
        className="text-3xl font-bold bg-clip-text text-transparent animate-gradient-flow"
        style={{
          backgroundImage: 'linear-gradient(90deg, #f97316, #ec4899, #8b5cf6, #3b82f6, #10b981, #f97316)',
          backgroundSize: '200% 100%',
        }}
      >
        {text}
      </span>
      <style>{`
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-gradient-flow {
          animation: gradient-flow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

// --- 4. TEXT WAVE ---
const TextWave: React.FC<TextEffectProps> = (props) => {
  const text = getText(props) || 'Wave Effect';
  const letters = text.split('');

  return (
    <div className="h-full bg-zinc-800 flex items-center justify-center p-4">
      <div className="flex">
        {letters.map((letter, i) => (
          <span
            key={i}
            className="text-2xl font-bold text-cyan-400 inline-block animate-wave"
            style={{
              animationDelay: `${i * 0.1}s`,
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// --- 5. TEXT SCRAMBLE ---
const TextScramble: React.FC<TextEffectProps> = (props) => {
  const targetText = getText(props) || 'DECODED';
  const [displayText, setDisplayText] = useState('');
  const [_isScrambling, setIsScrambling] = useState(true);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  useEffect(() => {
    let frame = 0;
    const totalFrames = 30;

    const scramble = () => {
      if (frame >= totalFrames) {
        setDisplayText(targetText);
        setIsScrambling(false);
        return;
      }

      const progress = frame / totalFrames;
      const revealed = Math.floor(progress * targetText.length);

      const result = targetText.split('').map((char, i) => {
        if (i < revealed) return char;
        if (char === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');

      setDisplayText(result);
      frame++;
      requestAnimationFrame(scramble);
    };

    scramble();
  }, [targetText]);

  const restart = () => {
    setIsScrambling(true);
    setDisplayText('');
    // Trigger re-run of effect
    setTimeout(() => {
      let frame = 0;
      const totalFrames = 30;

      const scramble = () => {
        if (frame >= totalFrames) {
          setDisplayText(targetText);
          setIsScrambling(false);
          return;
        }

        const progress = frame / totalFrames;
        const revealed = Math.floor(progress * targetText.length);

        const result = targetText.split('').map((char, i) => {
          if (i < revealed) return char;
          if (char === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');

        setDisplayText(result);
        frame++;
        requestAnimationFrame(scramble);
      };

      scramble();
    }, 100);
  };

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      <span className="font-mono text-2xl font-bold text-emerald-400 tracking-wider">
        {displayText}
      </span>
      <button
        onClick={restart}
        className="mt-4 px-3 py-1 bg-emerald-600 text-white rounded text-xs font-mono hover:bg-emerald-500 transition-colors"
      >
        DECODE AGAIN
      </button>
    </div>
  );
};

// --- 6. TEXT SPLIT REVEAL ---
const TextSplitReveal: React.FC<TextEffectProps> = (props) => {
  const text = getText(props) || 'Split Reveal';
  const words = text.split(' ');
  const [isAnimating, setIsAnimating] = useState(true);

  const restart = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 50);
  };

  return (
    <div className="h-full bg-zinc-800 flex flex-col items-center justify-center p-4">
      <div className="flex flex-wrap justify-center gap-2">
        {words.map((word, wordIndex) => (
          <div key={wordIndex} className="flex">
            {word.split('').map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className={`text-2xl font-bold text-amber-400 inline-block ${isAnimating ? 'animate-split-reveal' : 'opacity-0'}`}
                style={{
                  animationDelay: `${(wordIndex * 0.2) + (letterIndex * 0.05)}s`,
                  animationFillMode: 'forwards',
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={restart}
        className="mt-4 px-3 py-1 bg-amber-600 text-white rounded text-xs font-mono hover:bg-amber-500 transition-colors"
      >
        REPLAY
      </button>
      <style>{`
        @keyframes split-reveal {
          0% {
            opacity: 0;
            transform: translateY(20px) rotateX(-90deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }
        .animate-split-reveal {
          animation: split-reveal 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
          animation-fill-mode: forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

// --- 7. TEXT BLUR IN ---
const TextBlurIn: React.FC<TextEffectProps> = (props) => {
  const text = getText(props) || 'Blur In';
  const [isAnimating, setIsAnimating] = useState(true);

  const restart = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 50);
  };

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      <span
        className={`text-3xl font-bold text-white ${isAnimating ? 'animate-blur-in' : 'opacity-0 blur-lg'}`}
      >
        {text}
      </span>
      <button
        onClick={restart}
        className="mt-4 px-3 py-1 bg-zinc-600 text-white rounded text-xs font-mono hover:bg-zinc-500 transition-colors"
      >
        REPLAY
      </button>
      <style>{`
        @keyframes blur-in {
          0% {
            opacity: 0;
            filter: blur(20px);
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: scale(1);
          }
        }
        .animate-blur-in {
          animation: blur-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// --- 8. TEXT BOUNCE IN ---
const TextBounceIn: React.FC<TextEffectProps> = (props) => {
  const text = getText(props) || 'Bounce!';
  const letters = text.split('');
  const [isAnimating, setIsAnimating] = useState(true);

  const restart = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 50);
  };

  return (
    <div className="h-full bg-zinc-800 flex flex-col items-center justify-center p-4">
      <div className="flex">
        {letters.map((letter, i) => (
          <span
            key={i}
            className={`text-3xl font-bold text-pink-400 inline-block ${isAnimating ? 'animate-bounce-in' : 'opacity-0 translate-y-8'}`}
            style={{
              animationDelay: `${i * 0.1}s`,
              animationFillMode: 'forwards',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
      <button
        onClick={restart}
        className="mt-4 px-3 py-1 bg-pink-600 text-white rounded text-xs font-mono hover:bg-pink-500 transition-colors"
      >
        REPLAY
      </button>
      <style>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.5);
          }
          60% {
            opacity: 1;
            transform: translateY(-10px) scale(1.1);
          }
          80% {
            transform: translateY(5px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
          animation-fill-mode: forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

// --- 9. TEXT HIGHLIGHT SWEEP ---
const TextHighlightSweep: React.FC<TextEffectProps> = (props) => {
  const text = getText(props) || 'Highlight Sweep';

  return (
    <div className="h-full bg-zinc-900 flex items-center justify-center p-4">
      <span className="text-2xl font-bold text-white relative overflow-hidden inline-block">
        {text}
        <span
          className="absolute inset-0 bg-gradient-to-r from-yellow-400/60 via-yellow-400/60 to-transparent animate-highlight-sweep"
          style={{ width: '200%' }}
        />
      </span>
      <style>{`
        @keyframes highlight-sweep {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-highlight-sweep {
          animation: highlight-sweep 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// --- 10. TEXT 3D ROTATE ---
const Text3DRotate: React.FC<TextEffectProps> = (props) => {
  const text = getText(props) || '3D Rotate';
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -30;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className="h-full bg-zinc-800 flex items-center justify-center p-4"
      style={{ perspective: '500px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className="text-3xl font-bold text-violet-400 transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          textShadow: '2px 2px 0 #4c1d95, 4px 4px 0 #3b0764',
        }}
      >
        {text}
      </span>
      <p className="absolute bottom-2 text-zinc-500 font-mono text-xs">MOVE MOUSE TO ROTATE</p>
    </div>
  );
};

// --- 11. TEXT NEON FLICKER ---
const TextNeonFlicker: React.FC<TextEffectProps> = (props) => {
  const text = getText(props) || 'NEON';
  const [flickerClass, setFlickerClass] = useState('');

  useEffect(() => {
    const flickerSequence = () => {
      const delays = [100, 50, 100, 50, 200, 50, 100];
      let i = 0;

      const flicker = () => {
        if (i >= delays.length) {
          setFlickerClass('');
          setTimeout(flickerSequence, 2000 + Math.random() * 3000);
          return;
        }
        setFlickerClass(i % 2 === 0 ? 'opacity-30' : 'opacity-100');
        setTimeout(flicker, delays[i]);
        i++;
      };

      flicker();
    };

    flickerSequence();
  }, []);

  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center p-4">
      <span
        className={`text-4xl font-bold transition-opacity duration-50 ${flickerClass}`}
        style={{
          color: '#ff00ff',
          textShadow: `
            0 0 5px #ff00ff,
            0 0 10px #ff00ff,
            0 0 20px #ff00ff,
            0 0 40px #ff00ff,
            0 0 80px #ff00ff
          `,
          fontFamily: 'monospace',
        }}
      >
        {text}
      </span>
      <style>{`
        @keyframes neon-pulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
        }
      `}</style>
    </div>
  );
};

// --- 12. TEXT MORPHING ---
const TextMorphing: React.FC<TextEffectProps> = (props) => {
  const defaultWords = ['Hello', 'World', 'React', 'Magic'];
  const text = getText(props);
  const words = text ? text.split(' ') : defaultWords;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayWord, setDisplayWord] = useState(words[0]);
  const [nextWord, setNextWord] = useState(words[1] || words[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      const nextIndex = (currentIndex + 1) % words.length;
      setNextWord(words[nextIndex]);

      setTimeout(() => {
        setDisplayWord(words[nextIndex]);
        setCurrentIndex(nextIndex);
        setIsAnimating(false);
      }, 500);
    }, 2500);

    return () => clearInterval(interval);
  }, [currentIndex, words]);

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="relative h-12 flex items-center justify-center overflow-hidden">
        <span
          className={`text-3xl font-bold text-sky-400 absolute transition-all duration-500 ${
            isAnimating ? 'opacity-0 -translate-y-8 blur-sm' : 'opacity-100 translate-y-0 blur-0'
          }`}
        >
          {displayWord}
        </span>
        <span
          className={`text-3xl font-bold text-sky-400 absolute transition-all duration-500 ${
            isAnimating ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
          }`}
        >
          {nextWord}
        </span>
      </div>
      <div className="mt-4 flex gap-1">
        {words.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentIndex ? 'bg-sky-400' : 'bg-zinc-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Export all text effects as a record
export const textEffects: Record<string, React.FC<TextEffectProps>> = {
  'text-typewriter': TextTypewriter,
  'text-glitch': TextGlitch,
  'text-gradient-flow': TextGradientFlow,
  'text-wave': TextWave,
  'text-scramble': TextScramble,
  'text-split-reveal': TextSplitReveal,
  'text-blur-in': TextBlurIn,
  'text-bounce-in': TextBounceIn,
  'text-highlight-sweep': TextHighlightSweep,
  'text-3d-rotate': Text3DRotate,
  'text-neon-flicker': TextNeonFlicker,
  'text-morphing': TextMorphing,
};

// Also export individual components for direct use
export {
  TextTypewriter,
  TextGlitch,
  TextGradientFlow,
  TextWave,
  TextScramble,
  TextSplitReveal,
  TextBlurIn,
  TextBounceIn,
  TextHighlightSweep,
  Text3DRotate,
  TextNeonFlicker,
  TextMorphing,
};

export default textEffects;
