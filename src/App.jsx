import React, { useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import SnowOverlay from './components/SnowOverlay';
import HeartsOverlay from './components/HeartsOverlay';
import { resolveTheme } from './config/themes';

const App = () => {
  const initialTheme = useMemo(() => resolveTheme(), []);
  const [theme] = useState(initialTheme);
  const [overlayEnabled, setOverlayEnabled] = useState(true);

  const renderOverlay = () => {
    if (!overlayEnabled) return null;
    if (theme.overlay === 'snow') return <SnowOverlay accent={theme.accent} />;
    if (theme.overlay === 'hearts') return <HeartsOverlay accent={theme.accent} />;
    return null;
  };

  return (
    <div className="app" style={{ backgroundImage: theme.background }}>
      {renderOverlay()}
      <div className="content">
        <Header accent={theme.accent} />
        <main>
          <Routes>
            <Route path="/" element={<Home theme={theme} onToggleOverlay={() => setOverlayEnabled((v) => !v)} overlayEnabled={overlayEnabled} />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
