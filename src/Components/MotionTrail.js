import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const EMERALD = '16, 185, 129';
const MAX_POINTS = 18;
const FADE_MS = 620;
const MIN_STEP_PX = 9;

/**
 * A short decaying trail of joint-like dots following the pointer.
 *
 * The site argues that the way a person moves identifies them; this leaves that
 * trace visible for half a second. Drawn on a single canvas rather than as DOM
 * nodes so the cost stays flat, and skipped entirely for coarse pointers, where
 * there is no cursor to trail.
 */
const MotionTrail = () => {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const frameRef = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    if (window.matchMedia?.('(pointer: coarse)').matches) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e) => {
      const points = pointsRef.current;
      const last = points[points.length - 1];
      // Sample by distance, not by event: mice fire far more often than the
      // trail needs, and unsampled points bunch into a solid blob.
      if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) < MIN_STEP_PX) return;
      points.push({ x: e.clientX, y: e.clientY, born: performance.now() });
      if (points.length > MAX_POINTS) points.shift();
    };

    const draw = () => {
      const now = performance.now();
      const points = pointsRef.current.filter((p) => now - p.born < FADE_MS);
      pointsRef.current = points;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 1; i < points.length; i += 1) {
        const life = 1 - (now - points[i].born) / FADE_MS;
        ctx.beginPath();
        ctx.moveTo(points[i - 1].x, points[i - 1].y);
        ctx.lineTo(points[i].x, points[i].y);
        ctx.strokeStyle = `rgba(${EMERALD}, ${life * 0.16})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (const p of points) {
        const life = 1 - (now - p.born) / FADE_MS;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6 * life + 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${EMERALD}, ${life * 0.4})`;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
};

export default MotionTrail;
