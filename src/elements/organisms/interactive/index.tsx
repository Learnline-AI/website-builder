/**
 * Interactive Organisms
 * Complex interactive components: games, physics toys, animated displays
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ElementEntry } from '../../registry';

// ============================================================================
// STYLE PRESETS
// ============================================================================

const interactiveStyles = {
  container: {
    default: 'bg-white rounded-lg border border-gray-200 p-4',
    dark: 'bg-gray-900 rounded-lg border border-gray-700 p-4',
    brutal: 'bg-yellow-100 border-4 border-black shadow-[8px_8px_0_0_#000] p-4',
    neon: 'bg-black rounded-lg border border-cyan-500 shadow-[0_0_20px_rgba(0,255,255,0.3)] p-4',
    glass: 'bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4',
    arcade: 'bg-gray-900 rounded-lg border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)] p-4',
  },
  canvas: {
    default: 'bg-gray-100 rounded border border-gray-300',
    dark: 'bg-gray-800 rounded border border-gray-600',
    brutal: 'bg-white border-4 border-black',
    neon: 'bg-gray-900 rounded border border-cyan-400',
    glass: 'bg-black/20 rounded-xl border border-white/10',
    arcade: 'bg-black rounded border-2 border-purple-400',
  },
  button: {
    default: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors',
    dark: 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors',
    brutal: 'px-4 py-2 bg-black text-white border-2 border-black hover:bg-yellow-400 hover:text-black transition-colors font-bold',
    neon: 'px-4 py-2 bg-transparent text-cyan-400 border border-cyan-400 rounded hover:bg-cyan-400/20 transition-colors',
    glass: 'px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur',
    arcade: 'px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition-colors font-bold uppercase tracking-wide',
  },
  text: {
    default: 'text-gray-900',
    dark: 'text-white',
    brutal: 'text-black font-bold',
    neon: 'text-cyan-400',
    glass: 'text-white',
    arcade: 'text-purple-300',
  },
};

type InteractiveVariant = 'default' | 'dark' | 'brutal' | 'neon' | 'glass' | 'arcade';

// ============================================================================
// BOUNCING BALL - Physics Simulation
// ============================================================================

interface BouncingBallProps {
  variant?: InteractiveVariant;
  ballCount?: number;
}

export const BouncingBall: React.FC<BouncingBallProps> = ({ variant = 'default', ballCount = 3 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const ballsRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string }>>([]);

  const colors = {
    default: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'],
    dark: ['#60A5FA', '#F87171', '#34D399', '#FBBF24', '#A78BFA'],
    brutal: ['#000000', '#FF0000', '#00FF00', '#FFFF00', '#FF00FF'],
    neon: ['#00FFFF', '#FF00FF', '#00FF00', '#FFFF00', '#FF6600'],
    glass: ['#FFFFFF', '#A5B4FC', '#93C5FD', '#C4B5FD', '#FCA5A5'],
    arcade: ['#A855F7', '#EC4899', '#14B8A6', '#F59E0B', '#3B82F6'],
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const gravity = 0.5;
    const bounce = 0.8;
    const friction = 0.99;

    // Initialize balls
    if (ballsRef.current.length === 0) {
      const colorSet = colors[variant];
      for (let i = 0; i < ballCount; i++) {
        ballsRef.current.push({
          x: Math.random() * (width - 40) + 20,
          y: Math.random() * (height / 2),
          vx: (Math.random() - 0.5) * 10,
          vy: Math.random() * 5,
          radius: 15 + Math.random() * 15,
          color: colorSet[i % colorSet.length],
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      ballsRef.current.forEach((ball) => {
        ball.vy += gravity;
        ball.vx *= friction;
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.y + ball.radius > height) {
          ball.y = height - ball.radius;
          ball.vy *= -bounce;
        }
        if (ball.x + ball.radius > width || ball.x - ball.radius < 0) {
          ball.vx *= -bounce;
          ball.x = Math.max(ball.radius, Math.min(width - ball.radius, ball.x));
        }

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();

        if (variant === 'neon' || variant === 'arcade') {
          ctx.shadowColor = ball.color;
          ctx.shadowBlur = 20;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [variant, ballCount]);

  const resetBalls = () => {
    ballsRef.current = [];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const colorSet = colors[variant];
    for (let i = 0; i < ballCount; i++) {
      ballsRef.current.push({
        x: Math.random() * (canvas.width - 40) + 20,
        y: Math.random() * (canvas.height / 2),
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * 5,
        radius: 15 + Math.random() * 15,
        color: colorSet[i % colorSet.length],
      });
    }
  };

  return (
    <div className={interactiveStyles.container[variant]}>
      <div className="flex justify-between items-center mb-3">
        <span className={`font-semibold ${interactiveStyles.text[variant]}`}>Bouncing Balls</span>
        <button onClick={resetBalls} className={interactiveStyles.button[variant]}>
          Reset
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className={`w-full ${interactiveStyles.canvas[variant]}`}
      />
    </div>
  );
};

// ============================================================================
// PARTICLE SYSTEM - Animated Display
// ============================================================================

interface ParticleSystemProps {
  variant?: InteractiveVariant;
  particleCount?: number;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ variant = 'default', particleCount = 50 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100,
      });
    }

    const getColor = (life: number, maxLife: number) => {
      const alpha = life / maxLife;
      const colorMap = {
        default: `rgba(59, 130, 246, ${alpha})`,
        dark: `rgba(96, 165, 250, ${alpha})`,
        brutal: `rgba(0, 0, 0, ${alpha})`,
        neon: `rgba(0, 255, 255, ${alpha})`,
        glass: `rgba(255, 255, 255, ${alpha * 0.5})`,
        arcade: `rgba(168, 85, 247, ${alpha})`,
      };
      return colorMap[variant];
    };

    const animate = () => {
      ctx.fillStyle = variant === 'dark' || variant === 'neon' || variant === 'arcade'
        ? 'rgba(0, 0, 0, 0.1)'
        : 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Attract to mouse
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.vx += (dx / dist) * 0.2;
          p.vy += (dy / dist) * 0.2;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.life--;

        if (p.life <= 0) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
          p.life = p.maxLife;
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = getColor(p.life, p.maxLife);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [variant, particleCount]);

  return (
    <div className={interactiveStyles.container[variant]}>
      <div className="mb-3">
        <span className={`font-semibold ${interactiveStyles.text[variant]}`}>Particle System</span>
        <span className={`text-sm ml-2 opacity-60 ${interactiveStyles.text[variant]}`}>Move mouse to attract</span>
      </div>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className={`w-full cursor-crosshair ${interactiveStyles.canvas[variant]}`}
      />
    </div>
  );
};

// ============================================================================
// DRAG AND DROP SORTER
// ============================================================================

interface DragDropSorterProps {
  variant?: InteractiveVariant;
  items?: string[];
}

export const DragDropSorter: React.FC<DragDropSorterProps> = ({
  variant = 'default',
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
}) => {
  const [list, setList] = useState(items);
  const [dragging, setDragging] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  const itemStyles = {
    default: 'bg-white border border-gray-200 rounded p-3 cursor-move hover:border-blue-400',
    dark: 'bg-gray-800 border border-gray-600 rounded p-3 cursor-move hover:border-blue-400',
    brutal: 'bg-white border-4 border-black p-3 cursor-move hover:bg-yellow-100',
    neon: 'bg-gray-900 border border-cyan-500 rounded p-3 cursor-move hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]',
    glass: 'bg-white/10 border border-white/20 rounded-lg p-3 cursor-move hover:bg-white/20 backdrop-blur',
    arcade: 'bg-gray-800 border-2 border-purple-500 rounded p-3 cursor-move hover:border-purple-400',
  };

  const handleDragStart = (index: number) => {
    setDragging(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOver(index);
  };

  const handleDrop = (index: number) => {
    if (dragging === null) return;

    const newList = [...list];
    const [removed] = newList.splice(dragging, 1);
    newList.splice(index, 0, removed);
    setList(newList);
    setDragging(null);
    setDragOver(null);
  };

  const handleDragEnd = () => {
    setDragging(null);
    setDragOver(null);
  };

  return (
    <div className={interactiveStyles.container[variant]}>
      <div className="mb-3">
        <span className={`font-semibold ${interactiveStyles.text[variant]}`}>Drag & Drop Sorter</span>
      </div>
      <div className="space-y-2">
        {list.map((item, index) => (
          <div
            key={item}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={() => handleDrop(index)}
            onDragEnd={handleDragEnd}
            className={`
              ${itemStyles[variant]}
              ${interactiveStyles.text[variant]}
              ${dragging === index ? 'opacity-50' : ''}
              ${dragOver === index ? 'scale-105' : ''}
              transition-all duration-200
            `}
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-400">⋮⋮</span>
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// COLOR PICKER WHEEL
// ============================================================================

interface ColorPickerWheelProps {
  variant?: InteractiveVariant;
  onChange?: (color: string) => void;
}

export const ColorPickerWheel: React.FC<ColorPickerWheelProps> = ({ variant = 'default', onChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState('#3B82F6');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Draw color wheel
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = (angle - 1) * Math.PI / 180;
      const endAngle = (angle + 1) * Math.PI / 180;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, 'white');
      gradient.addColorStop(1, `hsl(${angle}, 100%, 50%)`);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.fillStyle = selectedColor;
    ctx.fill();
    ctx.strokeStyle = variant === 'dark' || variant === 'neon' ? '#fff' : '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [selectedColor, variant]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const imageData = ctx.getImageData(x, y, 1, 1).data;
    const color = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
    setSelectedColor(color);
    onChange?.(color);
  };

  return (
    <div className={interactiveStyles.container[variant]}>
      <div className="flex justify-between items-center mb-3">
        <span className={`font-semibold ${interactiveStyles.text[variant]}`}>Color Picker</span>
        <div
          className="w-8 h-8 rounded border-2 border-gray-300"
          style={{ backgroundColor: selectedColor }}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        onClick={handleClick}
        className={`cursor-crosshair mx-auto block ${interactiveStyles.canvas[variant]}`}
      />
      <div className={`text-center mt-2 font-mono text-sm ${interactiveStyles.text[variant]}`}>
        {selectedColor}
      </div>
    </div>
  );
};

// ============================================================================
// DRAWING CANVAS
// ============================================================================

interface DrawingCanvasProps {
  variant?: InteractiveVariant;
  brushSize?: number;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ variant = 'default', brushSize = 5 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(brushSize);

  const colors = ['#000000', '#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#FFFFFF'];

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = variant === 'dark' || variant === 'neon' || variant === 'arcade' ? '#111' : '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    clearCanvas();
  }, [variant]);

  return (
    <div className={interactiveStyles.container[variant]}>
      <div className="flex justify-between items-center mb-3">
        <span className={`font-semibold ${interactiveStyles.text[variant]}`}>Drawing Canvas</span>
        <button onClick={clearCanvas} className={interactiveStyles.button[variant]}>
          Clear
        </button>
      </div>
      <div className="flex gap-2 mb-3">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-blue-500 scale-110' : 'border-gray-300'}`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-sm ${interactiveStyles.text[variant]}`}>Size:</span>
        <input
          type="range"
          min="1"
          max="20"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="flex-1"
        />
        <span className={`text-sm w-6 ${interactiveStyles.text[variant]}`}>{size}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={400}
        height={250}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={draw}
        className={`w-full cursor-crosshair ${interactiveStyles.canvas[variant]}`}
      />
    </div>
  );
};

// ============================================================================
// MEMORY GAME
// ============================================================================

interface MemoryGameProps {
  variant?: InteractiveVariant;
  gridSize?: number;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({ variant = 'default', gridSize = 4 }) => {
  const emojis = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎬', '🎤'];
  const [cards, setCards] = useState<Array<{ emoji: string; flipped: boolean; matched: boolean }>>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const initGame = useCallback(() => {
    const pairs = gridSize * gridSize / 2;
    const selectedEmojis = emojis.slice(0, pairs);
    const shuffled = [...selectedEmojis, ...selectedEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji) => ({ emoji, flipped: false, matched: false }));
    setCards(shuffled);
    setFlippedIndices([]);
    setMoves(0);
  }, [gridSize]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCardClick = (index: number) => {
    if (isChecking || cards[index].flipped || cards[index].matched || flippedIndices.length >= 2) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsChecking(true);

      setTimeout(() => {
        const [first, second] = newFlipped;
        if (cards[first].emoji === cards[second].emoji) {
          newCards[first].matched = true;
          newCards[second].matched = true;
        } else {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
        }
        setCards([...newCards]);
        setFlippedIndices([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  const cardStyles = {
    default: 'bg-blue-500 hover:bg-blue-600',
    dark: 'bg-gray-700 hover:bg-gray-600',
    brutal: 'bg-black hover:bg-gray-800',
    neon: 'bg-cyan-900 hover:bg-cyan-800 border border-cyan-400',
    glass: 'bg-white/20 hover:bg-white/30 backdrop-blur',
    arcade: 'bg-purple-700 hover:bg-purple-600 border border-purple-400',
  };

  const isComplete = cards.every((c) => c.matched);

  return (
    <div className={interactiveStyles.container[variant]}>
      <div className="flex justify-between items-center mb-3">
        <span className={`font-semibold ${interactiveStyles.text[variant]}`}>Memory Game</span>
        <div className="flex items-center gap-3">
          <span className={`text-sm ${interactiveStyles.text[variant]}`}>Moves: {moves}</span>
          <button onClick={initGame} className={interactiveStyles.button[variant]}>
            Reset
          </button>
        </div>
      </div>
      {isComplete && (
        <div className={`text-center py-2 mb-3 rounded ${variant === 'neon' ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-700'}`}>
          You won in {moves} moves!
        </div>
      )}
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className={`
              aspect-square rounded-lg text-2xl transition-all duration-300
              ${card.flipped || card.matched ? 'bg-white rotate-y-180' : cardStyles[variant]}
              ${card.matched ? 'opacity-50' : ''}
            `}
          >
            {(card.flipped || card.matched) ? card.emoji : '?'}
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// SLIDER PUZZLE
// ============================================================================

interface SliderPuzzleProps {
  variant?: InteractiveVariant;
  size?: number;
}

export const SliderPuzzle: React.FC<SliderPuzzleProps> = ({ variant = 'default', size = 3 }) => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initPuzzle = useCallback(() => {
    const total = size * size;
    let arr = Array.from({ length: total - 1 }, (_, i) => i + 1);
    arr.push(0); // Empty space

    // Shuffle with solvability check
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setTiles(arr);
    setMoves(0);
  }, [size]);

  useEffect(() => {
    initPuzzle();
  }, [initPuzzle]);

  const handleTileClick = (index: number) => {
    const emptyIndex = tiles.indexOf(0);
    const row = Math.floor(index / size);
    const emptyRow = Math.floor(emptyIndex / size);
    const col = index % size;
    const emptyCol = emptyIndex % size;

    const isAdjacent =
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setMoves((m) => m + 1);
    }
  };

  const isSolved = tiles.every((tile, i) => tile === (i === tiles.length - 1 ? 0 : i + 1));

  const tileStyles = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    dark: 'bg-gray-700 text-white hover:bg-gray-600',
    brutal: 'bg-black text-white hover:bg-gray-800 border-2 border-white',
    neon: 'bg-cyan-900 text-cyan-400 hover:bg-cyan-800 border border-cyan-400',
    glass: 'bg-white/30 text-white hover:bg-white/40 backdrop-blur',
    arcade: 'bg-purple-700 text-white hover:bg-purple-600 border border-purple-400',
  };

  return (
    <div className={interactiveStyles.container[variant]}>
      <div className="flex justify-between items-center mb-3">
        <span className={`font-semibold ${interactiveStyles.text[variant]}`}>Slider Puzzle</span>
        <div className="flex items-center gap-3">
          <span className={`text-sm ${interactiveStyles.text[variant]}`}>Moves: {moves}</span>
          <button onClick={initPuzzle} className={interactiveStyles.button[variant]}>
            Shuffle
          </button>
        </div>
      </div>
      {isSolved && moves > 0 && (
        <div className={`text-center py-2 mb-3 rounded ${variant === 'neon' ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-700'}`}>
          Solved in {moves} moves!
        </div>
      )}
      <div
        className="grid gap-1 mx-auto"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, maxWidth: '250px' }}
      >
        {tiles.map((tile, index) => (
          <button
            key={index}
            onClick={() => handleTileClick(index)}
            disabled={tile === 0}
            className={`
              aspect-square rounded font-bold text-xl transition-all
              ${tile === 0 ? 'bg-transparent' : tileStyles[variant]}
            `}
          >
            {tile || ''}
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// REACTION TIME TEST
// ============================================================================

interface ReactionTimeTestProps {
  variant?: InteractiveVariant;
}

export const ReactionTimeTest: React.FC<ReactionTimeTestProps> = ({ variant = 'default' }) => {
  const [state, setState] = useState<'waiting' | 'ready' | 'go' | 'result' | 'early'>('waiting');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [results, setResults] = useState<number[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const startTest = () => {
    setState('ready');
    const delay = 2000 + Math.random() * 3000;
    timeoutRef.current = setTimeout(() => {
      setState('go');
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (state === 'waiting' || state === 'result' || state === 'early') {
      startTest();
    } else if (state === 'ready') {
      clearTimeout(timeoutRef.current);
      setState('early');
    } else if (state === 'go') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setResults((prev) => [...prev.slice(-4), time]);
      setState('result');
    }
  };

  const average = results.length > 0 ? Math.round(results.reduce((a, b) => a + b, 0) / results.length) : 0;

  const boxStyles = {
    waiting: {
      default: 'bg-blue-500',
      dark: 'bg-blue-600',
      brutal: 'bg-black',
      neon: 'bg-blue-900 border-2 border-blue-400',
      glass: 'bg-blue-500/50 backdrop-blur',
      arcade: 'bg-blue-700 border-2 border-blue-400',
    },
    ready: {
      default: 'bg-red-500',
      dark: 'bg-red-600',
      brutal: 'bg-red-600',
      neon: 'bg-red-900 border-2 border-red-400',
      glass: 'bg-red-500/50 backdrop-blur',
      arcade: 'bg-red-700 border-2 border-red-400',
    },
    go: {
      default: 'bg-green-500',
      dark: 'bg-green-600',
      brutal: 'bg-green-500',
      neon: 'bg-green-900 border-2 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.5)]',
      glass: 'bg-green-500/50 backdrop-blur',
      arcade: 'bg-green-700 border-2 border-green-400',
    },
  };

  const getBoxStyle = () => {
    if (state === 'early') return boxStyles.ready[variant];
    if (state === 'result') return boxStyles.waiting[variant];
    return boxStyles[state]?.[variant] || boxStyles.waiting[variant];
  };

  return (
    <div className={interactiveStyles.container[variant]}>
      <div className="flex justify-between items-center mb-3">
        <span className={`font-semibold ${interactiveStyles.text[variant]}`}>Reaction Time</span>
        {average > 0 && (
          <span className={`text-sm ${interactiveStyles.text[variant]}`}>Avg: {average}ms</span>
        )}
      </div>
      <button
        onClick={handleClick}
        className={`w-full h-48 rounded-lg text-white font-bold text-xl transition-colors ${getBoxStyle()}`}
      >
        {state === 'waiting' && 'Click to Start'}
        {state === 'ready' && 'Wait for green...'}
        {state === 'go' && 'CLICK NOW!'}
        {state === 'result' && `${reactionTime}ms - Click to retry`}
        {state === 'early' && 'Too early! Click to retry'}
      </button>
      {results.length > 0 && (
        <div className="flex justify-center gap-2 mt-3">
          {results.map((r, i) => (
            <span key={i} className={`text-xs px-2 py-1 rounded ${interactiveStyles.text[variant]} opacity-60`}>
              {r}ms
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// COUNTER WIDGET
// ============================================================================

interface CounterWidgetProps {
  variant?: InteractiveVariant;
  initialValue?: number;
  step?: number;
}

export const CounterWidget: React.FC<CounterWidgetProps> = ({ variant = 'default', initialValue = 0, step = 1 }) => {
  const [count, setCount] = useState(initialValue);

  return (
    <div className={interactiveStyles.container[variant]}>
      <div className="mb-3">
        <span className={`font-semibold ${interactiveStyles.text[variant]}`}>Counter</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setCount((c) => c - step)}
          className={`w-12 h-12 rounded-full text-2xl ${interactiveStyles.button[variant]}`}
        >
          -
        </button>
        <span className={`text-5xl font-bold tabular-nums ${interactiveStyles.text[variant]}`}>
          {count}
        </span>
        <button
          onClick={() => setCount((c) => c + step)}
          className={`w-12 h-12 rounded-full text-2xl ${interactiveStyles.button[variant]}`}
        >
          +
        </button>
      </div>
      <button
        onClick={() => setCount(initialValue)}
        className={`w-full mt-4 ${interactiveStyles.button[variant]} opacity-60`}
      >
        Reset
      </button>
    </div>
  );
};

// ============================================================================
// TYPING SPEED TEST
// ============================================================================

interface TypingSpeedTestProps {
  variant?: InteractiveVariant;
}

export const TypingSpeedTest: React.FC<TypingSpeedTestProps> = ({ variant = 'default' }) => {
  const phrases = [
    'The quick brown fox jumps over the lazy dog',
    'Pack my box with five dozen liquor jugs',
    'How vexingly quick daft zebras jump',
    'The five boxing wizards jump quickly',
    'Sphinx of black quartz judge my vow',
  ];

  const [phrase, setPhrase] = useState(phrases[0]);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!startTime && value.length === 1) {
      setStartTime(Date.now());
    }

    setInput(value);

    if (value === phrase) {
      const elapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
      const words = phrase.split(' ').length;
      setWpm(Math.round(words / elapsed));

      let correct = 0;
      for (let i = 0; i < phrase.length; i++) {
        if (value[i] === phrase[i]) correct++;
      }
      setAccuracy(Math.round((correct / phrase.length) * 100));
    }
  };

  const reset = () => {
    setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
    setInput('');
    setStartTime(null);
    setWpm(null);
    setAccuracy(null);
  };

  const inputStyles = {
    default: 'bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500',
    dark: 'bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-400',
    brutal: 'bg-white border-4 border-black px-3 py-2 focus:outline-none',
    neon: 'bg-gray-900 border border-cyan-400 rounded px-3 py-2 text-cyan-400 focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.5)]',
    glass: 'bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:bg-white/20 backdrop-blur',
    arcade: 'bg-gray-800 border-2 border-purple-400 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-300',
  };

  return (
    <div className={interactiveStyles.container[variant]}>
      <div className="flex justify-between items-center mb-3">
        <span className={`font-semibold ${interactiveStyles.text[variant]}`}>Typing Speed</span>
        <button onClick={reset} className={interactiveStyles.button[variant]}>
          New Phrase
        </button>
      </div>
      <div className={`p-3 rounded mb-3 font-mono ${interactiveStyles.canvas[variant]}`}>
        {phrase.split('').map((char, i) => (
          <span
            key={i}
            className={
              i < input.length
                ? input[i] === char
                  ? 'text-green-500'
                  : 'text-red-500 underline'
                : interactiveStyles.text[variant]
            }
          >
            {char}
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        disabled={wpm !== null}
        placeholder="Start typing..."
        className={`w-full ${inputStyles[variant]}`}
      />
      {wpm !== null && (
        <div className={`mt-3 text-center ${interactiveStyles.text[variant]}`}>
          <div className="text-3xl font-bold">{wpm} WPM</div>
          <div className="text-sm opacity-60">{accuracy}% accuracy</div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// INTERACTIVE TOGGLE GRID
// ============================================================================

interface ToggleGridProps {
  variant?: InteractiveVariant;
  rows?: number;
  cols?: number;
}

export const ToggleGrid: React.FC<ToggleGridProps> = ({ variant = 'default', rows = 5, cols = 5 }) => {
  const [grid, setGrid] = useState<boolean[][]>(
    Array(rows).fill(null).map(() => Array(cols).fill(false))
  );

  const toggleCell = (row: number, col: number) => {
    const newGrid = grid.map((r, ri) =>
      r.map((c, ci) => {
        if (ri === row && ci === col) return !c;
        if ((ri === row && Math.abs(ci - col) === 1) || (ci === col && Math.abs(ri - row) === 1)) return !c;
        return c;
      })
    );
    setGrid(newGrid);
  };

  const reset = () => {
    setGrid(Array(rows).fill(null).map(() => Array(cols).fill(false)));
  };

  const allOn = grid.every((row) => row.every((cell) => cell));

  const onStyle = {
    default: 'bg-blue-500',
    dark: 'bg-blue-400',
    brutal: 'bg-black',
    neon: 'bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)]',
    glass: 'bg-white/60',
    arcade: 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]',
  };

  const offStyle = {
    default: 'bg-gray-200 hover:bg-gray-300',
    dark: 'bg-gray-700 hover:bg-gray-600',
    brutal: 'bg-white border-2 border-black hover:bg-gray-100',
    neon: 'bg-gray-800 border border-gray-600 hover:border-cyan-400',
    glass: 'bg-white/10 hover:bg-white/20',
    arcade: 'bg-gray-800 border border-gray-600 hover:border-purple-400',
  };

  return (
    <div className={interactiveStyles.container[variant]}>
      <div className="flex justify-between items-center mb-3">
        <span className={`font-semibold ${interactiveStyles.text[variant]}`}>Lights Out</span>
        <button onClick={reset} className={interactiveStyles.button[variant]}>
          Reset
        </button>
      </div>
      {allOn && (
        <div className={`text-center py-2 mb-3 rounded ${variant === 'neon' ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-700'}`}>
          All lights on! You win!
        </div>
      )}
      <div className="grid gap-1 mx-auto" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, maxWidth: '200px' }}>
        {grid.map((row, ri) =>
          row.map((cell, ci) => (
            <button
              key={`${ri}-${ci}`}
              onClick={() => toggleCell(ri, ci)}
              className={`aspect-square rounded transition-all ${cell ? onStyle[variant] : offStyle[variant]}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

// ============================================================================
// REGISTRY ENTRIES
// ============================================================================

const createInteractiveEntry = (
  id: string,
  name: string,
  description: string,
  tags: string[],
  component: React.FC<any>,
  composedOf: string[] = []
): ElementEntry => ({
  id: `org-int-${id}`,
  name,
  layer: 'organism',
  category: 'organisms',
  description,
  themeAgnostic: false,
  composedOf,
  sourceComponents: ['multiple-zones'],
  extractedFrom: 'src/elements/organisms/interactive/index.tsx',
  previewType: 'card',
  hasInteraction: true,
  implementation: 'component',
  component,
  codeSnippet: `<${name.replace(/\s/g, '')} />`,
  tags: ['interactive', 'organism', ...tags],
});

export const interactiveRegistry: ElementEntry[] = [
  // Bouncing Ball variants
  createInteractiveEntry('bouncing-ball', 'Bouncing Ball', 'Physics simulation with bouncing balls', ['physics', 'animation', 'canvas'], BouncingBall, ['mol-canvas', 'mol-button']),
  createInteractiveEntry('bouncing-ball-neon', 'Bouncing Ball Neon', 'Neon-styled physics simulation', ['physics', 'animation', 'neon'], (props) => <BouncingBall {...props} variant="neon" />, ['mol-canvas', 'mol-button']),
  createInteractiveEntry('bouncing-ball-arcade', 'Bouncing Ball Arcade', 'Arcade-styled physics simulation', ['physics', 'animation', 'arcade'], (props) => <BouncingBall {...props} variant="arcade" />, ['mol-canvas', 'mol-button']),

  // Particle System variants
  createInteractiveEntry('particle-system', 'Particle System', 'Interactive particle animation', ['particles', 'animation', 'canvas'], ParticleSystem, ['mol-canvas']),
  createInteractiveEntry('particle-system-neon', 'Particle System Neon', 'Neon particle effects', ['particles', 'animation', 'neon'], (props) => <ParticleSystem {...props} variant="neon" />, ['mol-canvas']),
  createInteractiveEntry('particle-system-arcade', 'Particle System Arcade', 'Arcade particle effects', ['particles', 'animation', 'arcade'], (props) => <ParticleSystem {...props} variant="arcade" />, ['mol-canvas']),

  // Drag Drop Sorter variants
  createInteractiveEntry('drag-drop-sorter', 'Drag Drop Sorter', 'Reorderable list with drag and drop', ['drag', 'drop', 'list', 'sortable'], DragDropSorter, ['mol-list-item']),
  createInteractiveEntry('drag-drop-sorter-brutal', 'Drag Drop Sorter Brutal', 'Neo-brutal drag and drop list', ['drag', 'drop', 'brutal'], (props) => <DragDropSorter {...props} variant="brutal" />, ['mol-list-item']),
  createInteractiveEntry('drag-drop-sorter-glass', 'Drag Drop Sorter Glass', 'Glassmorphism drag and drop', ['drag', 'drop', 'glass'], (props) => <DragDropSorter {...props} variant="glass" />, ['mol-list-item']),

  // Color Picker variants
  createInteractiveEntry('color-picker-wheel', 'Color Picker Wheel', 'Circular color picker with canvas', ['color', 'picker', 'canvas'], ColorPickerWheel, ['mol-canvas']),
  createInteractiveEntry('color-picker-wheel-dark', 'Color Picker Wheel Dark', 'Dark theme color picker', ['color', 'picker', 'dark'], (props) => <ColorPickerWheel {...props} variant="dark" />, ['mol-canvas']),

  // Drawing Canvas variants
  createInteractiveEntry('drawing-canvas', 'Drawing Canvas', 'Freehand drawing tool', ['draw', 'canvas', 'paint'], DrawingCanvas, ['mol-canvas', 'mol-button', 'mol-slider']),
  createInteractiveEntry('drawing-canvas-dark', 'Drawing Canvas Dark', 'Dark theme drawing tool', ['draw', 'canvas', 'dark'], (props) => <DrawingCanvas {...props} variant="dark" />, ['mol-canvas', 'mol-button', 'mol-slider']),
  createInteractiveEntry('drawing-canvas-neon', 'Drawing Canvas Neon', 'Neon drawing experience', ['draw', 'canvas', 'neon'], (props) => <DrawingCanvas {...props} variant="neon" />, ['mol-canvas', 'mol-button', 'mol-slider']),

  // Memory Game variants
  createInteractiveEntry('memory-game', 'Memory Game', 'Card matching memory game', ['game', 'memory', 'cards'], MemoryGame, ['mol-card', 'mol-button']),
  createInteractiveEntry('memory-game-neon', 'Memory Game Neon', 'Neon-styled memory game', ['game', 'memory', 'neon'], (props) => <MemoryGame {...props} variant="neon" />, ['mol-card', 'mol-button']),
  createInteractiveEntry('memory-game-arcade', 'Memory Game Arcade', 'Arcade-styled memory game', ['game', 'memory', 'arcade'], (props) => <MemoryGame {...props} variant="arcade" />, ['mol-card', 'mol-button']),

  // Slider Puzzle variants
  createInteractiveEntry('slider-puzzle', 'Slider Puzzle', 'Number sliding puzzle game', ['game', 'puzzle', 'numbers'], SliderPuzzle, ['mol-button']),
  createInteractiveEntry('slider-puzzle-brutal', 'Slider Puzzle Brutal', 'Brutal-styled slider puzzle', ['game', 'puzzle', 'brutal'], (props) => <SliderPuzzle {...props} variant="brutal" />, ['mol-button']),
  createInteractiveEntry('slider-puzzle-neon', 'Slider Puzzle Neon', 'Neon slider puzzle', ['game', 'puzzle', 'neon'], (props) => <SliderPuzzle {...props} variant="neon" />, ['mol-button']),

  // Reaction Time Test variants
  createInteractiveEntry('reaction-time-test', 'Reaction Time Test', 'Test your reaction speed', ['game', 'reaction', 'speed'], ReactionTimeTest, ['mol-button']),
  createInteractiveEntry('reaction-time-test-neon', 'Reaction Time Neon', 'Neon reaction time test', ['game', 'reaction', 'neon'], (props) => <ReactionTimeTest {...props} variant="neon" />, ['mol-button']),
  createInteractiveEntry('reaction-time-test-arcade', 'Reaction Time Arcade', 'Arcade reaction test', ['game', 'reaction', 'arcade'], (props) => <ReactionTimeTest {...props} variant="arcade" />, ['mol-button']),

  // Counter Widget variants
  createInteractiveEntry('counter-widget', 'Counter Widget', 'Interactive increment/decrement counter', ['counter', 'increment', 'simple'], CounterWidget, ['mol-button']),
  createInteractiveEntry('counter-widget-brutal', 'Counter Widget Brutal', 'Brutal-styled counter', ['counter', 'brutal'], (props) => <CounterWidget {...props} variant="brutal" />, ['mol-button']),
  createInteractiveEntry('counter-widget-glass', 'Counter Widget Glass', 'Glassmorphism counter', ['counter', 'glass'], (props) => <CounterWidget {...props} variant="glass" />, ['mol-button']),

  // Typing Speed Test variants
  createInteractiveEntry('typing-speed-test', 'Typing Speed Test', 'Measure typing speed in WPM', ['typing', 'speed', 'test'], TypingSpeedTest, ['mol-input', 'mol-button']),
  createInteractiveEntry('typing-speed-test-dark', 'Typing Speed Dark', 'Dark theme typing test', ['typing', 'speed', 'dark'], (props) => <TypingSpeedTest {...props} variant="dark" />, ['mol-input', 'mol-button']),
  createInteractiveEntry('typing-speed-test-neon', 'Typing Speed Neon', 'Neon typing test', ['typing', 'speed', 'neon'], (props) => <TypingSpeedTest {...props} variant="neon" />, ['mol-input', 'mol-button']),

  // Toggle Grid variants
  createInteractiveEntry('toggle-grid', 'Lights Out Grid', 'Lights out puzzle game', ['game', 'puzzle', 'grid'], ToggleGrid, ['mol-button']),
  createInteractiveEntry('toggle-grid-neon', 'Lights Out Neon', 'Neon lights out game', ['game', 'puzzle', 'neon'], (props) => <ToggleGrid {...props} variant="neon" />, ['mol-button']),
  createInteractiveEntry('toggle-grid-arcade', 'Lights Out Arcade', 'Arcade lights out', ['game', 'puzzle', 'arcade'], (props) => <ToggleGrid {...props} variant="arcade" />, ['mol-button']),
];

export default interactiveRegistry;
