import React from 'react';
import ThemeBanner from '../components/ThemeBanner';
import MusicPlayer from '../components/MusicPlayer';
import { withBasePath } from '../utils/assets';

const ICLOUD_EMBED_URL = import.meta.env.VITE_ICLOUD_EMBED_URL || '';

const Home = ({ theme, onToggleOverlay, overlayEnabled }) => {
  return (
    <div className="page">
      <ThemeBanner theme={theme} onToggleOverlay={onToggleOverlay} overlayEnabled={overlayEnabled} />
      <section className="hero-photo">
        <img src={withBasePath('photos/uploaded/DSC03786_Original.png')} alt="Featured holiday portrait" />
      </section>
      <section className="card">
        <h3>Welcome</h3>
        <p>
          This site automatically changes to match the season. Snow falls in December, hearts float near Valentine&apos;s Day, and
          a calm palette fills the rest of the year. Visit the Themes page to pin the style you want or share a specific look.
        </p>
      </section>
      <section className="card embed">
        <div className="embed__header">
          <div>
            <p className="eyebrow">Shared album</p>
            <h3>iCloud photos</h3>
            <p className="note">Stream the shared album right on the page. Update the embed link to point at your latest drop.</p>
          </div>
        </div>
        {ICLOUD_EMBED_URL ? (
          <div className="embed__frame">
            <iframe
              src={ICLOUD_EMBED_URL}
              title="Embedded iCloud photo album"
              allow="encrypted-media; fullscreen"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="embed__placeholder">
            <p>
              Add your iCloud shared album embed URL to <code>VITE_ICLOUD_EMBED_URL</code> so the photos play here. The space is
              ready for a full-height album view.
            </p>
          </div>
        )}
      </section>
      <MusicPlayer />
    </div>
  );
};

export default Home;
