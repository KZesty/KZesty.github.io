import React, { useEffect, useRef } from 'react';

const HeartsOverlay = ({ accent }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hearts = Array.from({ length: 35 }).map((_, i) => {
      const heart = document.createElement('span');
      heart.className = 'heart';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDelay = `${Math.random() * 4}s`;
      heart.style.animationDuration = `${6 + Math.random() * 8}s`;
      heart.style.opacity = `${0.4 + Math.random() * 0.6}`;
      heart.style.color = accent;
      heart.dataset.id = `heart-${i}`;
      container.appendChild(heart);
      return heart;
    });

    return () => {
      hearts.forEach((heart) => container.removeChild(heart));
    };
  }, [accent]);

  return <div className="overlay hearts" ref={containerRef} aria-hidden="true" />;
};

export default HeartsOverlay;
