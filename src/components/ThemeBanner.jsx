import React from 'react';
import { Link } from 'react-router-dom';

const ThemeBanner = ({ theme, onToggleOverlay, overlayEnabled }) => {
  return (
    <div className="theme-banner" style={{ borderColor: theme.accent }}>
      <div>
        <p className="eyebrow">Current theme</p>
        <h2>{theme.name}</h2>
        <p className="note">Background and accent colors adjust automatically based on the date.</p>
        <p className="note">
          Want to change it? Head to the <Link to="/themes">Themes</Link> page to pick a look.
        </p>
      </div>
      <div className="controls">
        <button className="ghost" onClick={onToggleOverlay}>
          {overlayEnabled ? 'Hide' : 'Show'} {theme.overlay === 'snow' ? 'Snow' : theme.overlay === 'hearts' ? 'Hearts' : 'Overlay'}
        </button>
      </div>
    </div>
  );
};

export default ThemeBanner;
