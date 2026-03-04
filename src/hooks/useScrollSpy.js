import { useState, useEffect } from 'react';

const useScrollSpy = (sectionIds, options = {}) => {
  const { threshold = 0.3, rootMargin = '0px' } = options;
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  useEffect(() => {
    const observers = [];
    const visibilityMap = new Map();

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibilityMap.set(id, entry.intersectionRatio);
          });

          // Find the section with highest visibility
          let maxRatio = 0;
          let maxId = sectionIds[0];
          visibilityMap.forEach((ratio, sectionId) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              maxId = sectionId;
            }
          });

          if (maxRatio > 0) {
            setActiveSection(maxId);
          }
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds, threshold, rootMargin]);

  return activeSection;
};

export default useScrollSpy;
