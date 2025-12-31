import { useEffect, useRef, useCallback } from 'react';

/**
 * Game loop hook for smooth animations using requestAnimationFrame
 * @param callback - Function called each frame with delta time in ms
 * @param active - Whether the loop should be running
 */
export const useGameLoop = (callback: (dt: number) => void, active: boolean) => {
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);
  const callbackRef = useRef(callback);

  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callbackRef.current(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (active) {
      previousTimeRef.current = undefined;
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [active, animate]);
};

/**
 * Hook to detect if user prefers reduced motion
 */
export const useReducedMotion = () => {
  const mediaQuery = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;
  return mediaQuery?.matches ?? false;
};

/**
 * Hook for interval-based updates
 */
export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
};

/**
 * Hook for mouse position tracking
 */
export const useMousePosition = () => {
  const ref = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      ref.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return ref;
};
