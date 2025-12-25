import React, { useEffect, useRef } from 'react';

const SnowOverlay = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const flakes = Array.from({ length: 50 }).map((_, i) => {
      const flake = document.createElement('span');
      flake.className = 'snowflake';
      flake.style.left = `${Math.random() * 100}%`;
      flake.style.animationDelay = `${Math.random() * 5}s`;
      flake.style.animationDuration = `${5 + Math.random() * 7}s`;
      flake.style.opacity = `${0.3 + Math.random() * 0.7}`;
      flake.style.background = '#ffffff';
      flake.style.transform = `scale(${0.5 + Math.random() * 0.8})`;
      flake.dataset.id = `flake-${i}`;
      container.appendChild(flake);
      return flake;
    });

    return () => {
      flakes.forEach((flake) => container.removeChild(flake));
    };
  }, []);

  return <div className="overlay snow" ref={containerRef} aria-hidden="true" />;
};

export default SnowOverlay;
