import React, { useEffect, useRef, useState } from 'react';
import { withBasePath } from '../utils/assets';

const STORAGE_KEY = 'seasonal-music-playing';

const tracks = [
  {
    src: withBasePath('audio/marias-heavy.mp3'),
    title: 'The Marías — Heavy'
  }
];

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'true') {
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio
        .play()
        .then(() => setError(''))
        .catch(() => {
          setError('Tap play to start music');
          setIsPlaying(false);
        });
    } else {
      audio.pause();
    }
    localStorage.setItem(STORAGE_KEY, isPlaying.toString());
  }, [isPlaying]);

  return (
    <div className="music-player">
      <div className="music-meta">
        <p className="eyebrow">Background music</p>
        <strong>{tracks[0].title}</strong>
        <p className="note">Music never autoplays; your preference is remembered.</p>
      </div>
      <div className="music-controls">
        <button onClick={() => setIsPlaying((prev) => !prev)}>{isPlaying ? 'Pause' : 'Play'}</button>
        {error && <span className="error">{error}</span>}
      </div>
      <audio ref={audioRef} src={tracks[0].src} loop preload="metadata" />
    </div>
  );
};

export default MusicPlayer;
