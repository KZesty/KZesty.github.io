import React from 'react';

const ThemeBanner = ({ theme, onToggleOverlay, overlayEnabled }) => {
  return (
    <div className="theme-banner" style={{ borderColor: theme.accent }}>
      <div>
        <p className="eyebrow">Current theme</p>
        <h2>{theme.name}</h2>
        <p className="note">Background and accent colors adjust automatically based on the date.</p>
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
