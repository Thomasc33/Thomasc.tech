import { useState, useEffect, useRef } from 'react';

const useCountUp = ({ end, duration = 2000, startOnView = true }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimatedRef = useRef(false);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!startOnView || !ref.current) return;

    const animate = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      const startTime = performance.now();

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * end));

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(step);
        }
      };

      animationRef.current = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            animate();
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    observer.observe(currentRef);

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [end, duration, startOnView]);

  return { ref, count };
};

export default useCountUp;
