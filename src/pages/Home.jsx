import React from 'react';
import ThemeBanner from '../components/ThemeBanner';
import MusicPlayer from '../components/MusicPlayer';

const Home = ({ theme, onToggleOverlay, overlayEnabled }) => {
  return (
    <div className="page">
      <ThemeBanner theme={theme} onToggleOverlay={onToggleOverlay} overlayEnabled={overlayEnabled} />
      <section className="card">
        <h3>Welcome</h3>
        <p>
          This site automatically changes to match the season. Snow falls in December, hearts float near Valentine&apos;s Day, and
          a calm palette fills the rest of the year. Use the query parameter <code>?theme=christmas</code> or
          <code>?theme=valentines</code> to preview specific looks.
        </p>
      </section>
      <MusicPlayer />
    </div>
  );
};

export default Home;
