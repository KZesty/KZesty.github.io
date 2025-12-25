import React from 'react';
import { THEMES } from '../config/themes';

const ThemeSelector = ({ theme, onSelectTheme }) => {
  return (
    <div className="page">
      <section className="card">
        <p className="eyebrow">Pick your vibe</p>
        <h3>Theme selector</h3>
        <p className="note">
          Explore seasonal looks and apply the one you want. Your pick will stick to the URL so you can refresh or share the page
          without losing the style.
        </p>
      </section>

      <div className="theme-grid">
        {Object.values(THEMES).map((entry) => (
          <article
            key={entry.key}
            className={`theme-card ${entry.key === theme.key ? 'active' : ''}`}
            style={{ borderColor: entry.accent }}
          >
            <div
              className="theme-swatch"
              style={{
                backgroundImage: entry.backgroundImage,
                backgroundSize: entry.backgroundSize,
                backgroundRepeat: entry.backgroundRepeat,
                backgroundPosition: entry.backgroundPosition
              }}
            />
            <div className="theme-card__body">
              <div>
                <p className="eyebrow">{entry.overlay === 'snow' ? 'Snowfall' : entry.overlay === 'hearts' ? 'Hearts' : 'Clean'}</p>
                <h4>{entry.name}</h4>
              </div>
              <button onClick={() => onSelectTheme(entry.key)} disabled={entry.key === theme.key}>
                {entry.key === theme.key ? 'Selected' : 'Apply theme'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
