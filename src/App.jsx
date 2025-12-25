import React, { useEffect, useMemo, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import SnowOverlay from './components/SnowOverlay';
import HeartsOverlay from './components/HeartsOverlay';
import { resolveTheme, THEMES } from './config/themes';
import ThemeSelector from './pages/ThemeSelector';

const App = () => {
  const location = useLocation();
  const initialTheme = useMemo(() => resolveTheme(), []);
  const [theme, setTheme] = useState(initialTheme);
  const [overlayEnabled, setOverlayEnabled] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('theme', theme.key);
    window.history.replaceState({}, '', url.toString());
  }, [theme]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramTheme = params.get('theme');
    if (paramTheme && THEMES[paramTheme]) {
      setTheme(THEMES[paramTheme]);
    }
  }, [location.search]);

  const renderOverlay = () => {
    if (!overlayEnabled) return null;
    if (theme.overlay === 'snow') return <SnowOverlay />;
    if (theme.overlay === 'hearts') return <HeartsOverlay accent={theme.accent} />;
    return null;
  };

  const handleThemeChange = (themeKey) => {
    if (THEMES[themeKey]) {
      setTheme(THEMES[themeKey]);
    }
  };

  const backgroundStyle = {
    backgroundImage: theme.backgroundImage,
    backgroundSize: theme.backgroundSize || 'cover',
    backgroundRepeat: theme.backgroundRepeat || 'no-repeat',
    backgroundPosition: theme.backgroundPosition || 'center center',
    backgroundAttachment: theme.backgroundAttachment || 'fixed'
  };

  return (
    <div className={`app theme-${theme.key}`} style={backgroundStyle}>
      {renderOverlay()}
      <div className="content">
        <Header accent={theme.accent} />
        <main>
          <Routes>
            <Route
              path="/"
              element={<Home theme={theme} onToggleOverlay={() => setOverlayEnabled((v) => !v)} overlayEnabled={overlayEnabled} />}
            />
            <Route path="/themes" element={<ThemeSelector theme={theme} onSelectTheme={handleThemeChange} />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
