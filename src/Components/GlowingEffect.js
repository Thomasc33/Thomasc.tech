import { memo, useCallback, useEffect, useRef } from 'react';
import { animate } from 'motion/react';

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = 'default',
    glow = false,
    disabled = true,
    movementDuration = 2,
    borderWidth = 1,
  }) => {
    const containerRef = useRef(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef(0);

    const handleMove = useCallback(
      (e) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty('--active', '0');
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty('--active', isActive ? '1' : '0');

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue('--start')) || 0;
          const targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty('--start', String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e) => handleMove(e);

      window.addEventListener('scroll', handleScroll, { passive: true });
      document.body.addEventListener('pointermove', handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener('scroll', handleScroll);
        document.body.removeEventListener('pointermove', handlePointerMove);
      };
    }, [handleMove, disabled]);

    const inactiveBorderStyle = {
      pointerEvents: 'none',
      position: 'absolute',
      inset: '-1px',
      display: disabled ? 'block' : 'none',
      borderRadius: 'inherit',
      border: variant === 'white' ? '1px solid white' : '1px solid transparent',
      opacity: glow ? 1 : 0,
      transition: 'opacity 0.3s',
    };

    const containerStyle = {
      '--blur': `${blur}px`,
      '--spread': spread,
      '--start': '0',
      '--active': '0',
      '--glowingeffect-border-width': `${borderWidth}px`,
      '--repeating-conic-gradient-times': '5',
      '--gradient':
        variant === 'white'
          ? `repeating-conic-gradient(
              from 236.84deg at 50% 50%,
              #000,
              #000 calc(25% / var(--repeating-conic-gradient-times))
            )`
          : `radial-gradient(circle, #10b981 10%, #10b98100 20%),
            radial-gradient(circle at 40% 40%, #d4a853 5%, #d4a85300 15%),
            radial-gradient(circle at 60% 60%, #10b981 10%, #10b98100 20%),
            radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
            repeating-conic-gradient(
              from 236.84deg at 50% 50%,
              #10b981 0%,
              #d4a853 calc(25% / var(--repeating-conic-gradient-times)),
              #10b981 calc(50% / var(--repeating-conic-gradient-times)),
              #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
              #10b981 calc(100% / var(--repeating-conic-gradient-times))
            )`,
      pointerEvents: 'none',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      opacity: glow ? 1 : 0,
      transition: 'opacity 0.3s',
      display: disabled ? 'none' : 'block',
      filter: blur > 0 ? `blur(${blur}px)` : undefined,
    };

    return (
      <>
        <div style={inactiveBorderStyle} />
        <div ref={containerRef} style={containerStyle}>
          <div className="glowing-effect-glow" />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = 'GlowingEffect';

export default GlowingEffect;
