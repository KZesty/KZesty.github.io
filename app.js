(function () {
  /**
   * Cached references used across theme and overlay helpers.
   */
  const root = document.documentElement;
  const canvas = document.getElementById('overlayCanvas');
  const ctx = canvas.getContext('2d');
  let animationId;
  let particles = [];
  let overlayEnabled = true;
  let activeOverlay = 'none';

  const THEME_KEY = 'seasonal-theme';
  const OVERLAY_KEY = 'overlay-enabled';
  const MUSIC_PREFS_KEY = 'music-prefs';

  const themes = {
    default: {
      bg: 'radial-gradient(circle at 20% 20%, #f5f7fb, #e4ecff 40%, #d2def7 70%, #c3d8ff)',
      accent: '#5c6dfd',
      text: '#0f172a',
      card: 'rgba(255,255,255,0.7)',
      overlay: 'none',
    },
    christmas: {
      bg: 'radial-gradient(circle at 10% 20%, #d9f6ff, #c0e5ff 30%, #8ae8d0 60%, #f7fff5)',
      accent: '#b11226',
      text: '#0b2030',
      card: 'rgba(255, 255, 255, 0.78)',
      overlay: 'snow',
    },
    valentines: {
      bg: 'radial-gradient(circle at 20% 10%, #ffe4ec, #ffc2d7 30%, #ffa7c4 60%, #ffeef6)',
      accent: '#e6397d',
      text: '#2c0a1b',
      card: 'rgba(255, 245, 249, 0.82)',
      overlay: 'hearts',
    },
  };

  /**
   * Extract a forced theme name from the URL query string when present.
   */
  function readQueryTheme() {
    const params = new URLSearchParams(window.location.search);
    const forced = params.get('theme');
    if (forced && themes[forced]) {
      return forced;
    }
    return null;
  }

  /**
   * Choose a seasonal default theme based on the current calendar date.
   */
  function pickDateTheme() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    if (month === 12) return 'christmas';
    if (month === 2 && day <= 14) return 'valentines';
    return 'default';
  }

  /**
   * Retrieve a previously stored theme preference from localStorage.
   */
  function getStoredThemeSelection() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'auto') return 'auto';
    if (stored && themes[stored]) return stored;
    return null;
  }

  /**
   * Resolve the theme that should be applied on page load.
   */
  function getInitialTheme() {
    const forced = readQueryTheme();
    if (forced) {
      return forced;
    }

    const stored = getStoredThemeSelection();
    if (stored && themes[stored]) return stored;

    return pickDateTheme();
  }

  /**
   * Apply a theme's colors and overlay choice to the document.
   */
  function applyTheme(themeKey) {
    const theme = themes[themeKey] || themes.default;
    root.style.setProperty('--bg', theme.bg);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--text', theme.text);
    root.style.setProperty('--card', theme.card);
    root.setAttribute('data-theme', themeKey);
    activeOverlay = theme.overlay;
    updateOverlayToggleState();
    document.getElementById('currentTheme').textContent = themeKey;
  }

  /**
   * Persist the theme selection so it can be restored later.
   */
  function storeTheme(themeKey) {
    localStorage.setItem(THEME_KEY, themeKey);
  }

  /**
   * Size the overlay canvas to fill the viewport.
   */
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  /**
   * Generate a random floating point value between two bounds.
   */
  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
   * Create particle definitions for either snow or heart overlays.
   */
  function initParticles(mode) {
    const count = Math.floor((window.innerWidth * window.innerHeight) / 12000);
    particles = Array.from({ length: count }, () => {
      if (mode === 'snow') {
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: randomBetween(1.2, 3.6),
          speed: randomBetween(0.5, 1.5),
          drift: randomBetween(-0.6, 0.6),
        };
      }
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: randomBetween(6, 12),
        speed: randomBetween(0.3, 0.8),
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: randomBetween(0.01, 0.04),
      };
    });
  }

  /**
   * Render heart particles with a gentle wobble animation.
   */
  function drawHearts() {
    ctx.fillStyle = 'rgba(230, 57, 125, 0.8)';
    particles.forEach((p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(Math.sin(p.wobble) * 0.2);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.r, -p.r, p.r * 2, p.r, 0, p.r * 2.2);
      ctx.bezierCurveTo(-p.r * 2, p.r, -p.r, -p.r, 0, 0);
      ctx.fill();
      ctx.restore();
      p.y += p.speed;
      p.wobble += p.wobbleSpeed;
      if (p.y > canvas.height + 20) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });
  }

  /**
   * Render snow particles with vertical drift and a subtle sway.
   */
  function drawSnow() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.y += p.speed;
      p.x += p.drift;
      if (p.y > canvas.height) {
        p.y = -5;
        p.x = Math.random() * canvas.width;
      }
      if (p.x > canvas.width || p.x < 0) {
        p.drift *= -1;
      }
    });
  }

  /**
   * Paint the overlay frame for the current overlay type.
   */
  function renderOverlay() {
    if (!overlayEnabled || activeOverlay === 'none') return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (activeOverlay === 'snow') {
      drawSnow();
    } else if (activeOverlay === 'hearts') {
      drawHearts();
    }
    animationId = requestAnimationFrame(renderOverlay);
  }

  /**
   * Reset particles and begin the overlay animation loop.
   */
  function startOverlay() {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!overlayEnabled || activeOverlay === 'none') return;
    initParticles(activeOverlay);
    renderOverlay();
  }

  /**
   * Resize the canvas and rebuild the overlay when the viewport changes.
   */
  function handleResize() {
    setCanvasSize();
    startOverlay();
  }

  /**
   * Sync the overlay toggle UI with the current preference and active overlay.
   */
  function updateOverlayToggleState() {
    const overlayToggle = document.getElementById('overlayToggle');
    const statusEl = document.getElementById('overlayStatus');
    overlayToggle.checked = overlayEnabled;
    statusEl.textContent = overlayEnabled && activeOverlay !== 'none' ? 'On' : 'Off';
  }

  /**
   * Save the overlay enabled flag to localStorage.
   */
  function persistOverlay(enabled) {
    localStorage.setItem(OVERLAY_KEY, JSON.stringify(enabled));
  }

  /**
   * Build the gallery grid from the global galleryItems definition.
   */
  function initGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!Array.isArray(window.galleryItems)) return;
    grid.innerHTML = '';
    window.galleryItems.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'gallery-card glass';
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || '';
      img.loading = 'lazy';
      const cap = document.createElement('div');
      cap.className = 'caption';
      cap.textContent = item.caption || '';
      card.append(img, cap);
      grid.appendChild(card);
    });
  }

  /**
   * Smoothly scroll to the given selector if it exists.
   */
  function smoothScroll(target) {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * Wire up header and hero navigation links for smooth scrolling.
   */
  function initNavigation() {
    document.querySelectorAll('header nav a').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll(link.getAttribute('href'));
      });
    });
    document.getElementById('scrollGallery').addEventListener('click', () => smoothScroll('#gallery'));
    document.getElementById('scrollAbout').addEventListener('click', () => smoothScroll('#about'));
  }

  /**
   * Configure the theme select dropdown and apply the initial theme.
   */
  function initThemeSwitcher(initialTheme) {
    const themeSelect = document.getElementById('themeSelect');
    const forced = readQueryTheme();
    const stored = getStoredThemeSelection();
    themeSelect.value = forced || stored || 'auto';

    applyTheme(initialTheme);

    themeSelect.addEventListener('change', () => {
      const selected = themeSelect.value;
      const themeKey = selected === 'auto' ? pickDateTheme() : selected;
      applyTheme(themeKey);
      storeTheme(selected);
      startOverlay();
    });
  }

  /**
   * Safely load persisted music preferences.
   */
  function loadMusicPrefs() {
    try {
      return JSON.parse(localStorage.getItem(MUSIC_PREFS_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  /**
   * Persist music preferences including track, volume, and autoplay intent.
   */
  function saveMusicPrefs(prefs) {
    localStorage.setItem(MUSIC_PREFS_KEY, JSON.stringify(prefs));
  }

  /**
   * Initialize the audio player controls and preference syncing.
   */
  function initMusic() {
    const audio = document.getElementById('audio');
    const playPause = document.getElementById('playPause');
    const volume = document.getElementById('volume');
    const trackSelect = document.getElementById('trackSelect');
    const nowPlaying = document.getElementById('nowPlaying');
    const musicStatus = document.getElementById('musicStatus');

    const prefs = loadMusicPrefs();
    const storedVolume = typeof prefs.volume === 'number' ? prefs.volume : 0.6;
    audio.volume = storedVolume;
    volume.value = storedVolume;

    if (prefs.track) {
      trackSelect.value = prefs.track;
      audio.querySelector('source').src = prefs.track;
      audio.load();
    }

    let userWantedPlay = prefs.shouldPlay || false;
    musicStatus.textContent = userWantedPlay ? 'Will play when you press Play' : 'Idle';

    /**
     * Update the now playing label with a descriptive state.
     */
    function updateNowPlaying(state) {
      nowPlaying.textContent = `${state} – ${trackSelect.options[trackSelect.selectedIndex].text}`;
    }

    /**
     * Toggle play/pause and persist the current playback intent.
     */
    function togglePlayback() {
      if (audio.paused) {
        audio.play().catch(() => {
          musicStatus.textContent = 'Click Play to start (blocked)';
        });
        userWantedPlay = true;
        playPause.textContent = 'Pause';
        musicStatus.textContent = 'Playing';
        updateNowPlaying('Playing');
      } else {
        audio.pause();
        userWantedPlay = false;
        playPause.textContent = 'Play';
        musicStatus.textContent = 'Paused';
        updateNowPlaying('Paused');
      }
      saveMusicPrefs({
        volume: audio.volume,
        track: trackSelect.value,
        shouldPlay: userWantedPlay,
      });
    }

    playPause.addEventListener('click', togglePlayback);

    volume.addEventListener('input', () => {
      audio.volume = volume.value;
      const prefs = loadMusicPrefs();
      saveMusicPrefs({
        ...prefs,
        volume: audio.volume,
      });
    });

    trackSelect.addEventListener('change', () => {
      const wasPlaying = !audio.paused;
      audio.pause();
      audio.querySelector('source').src = trackSelect.value;
      audio.load();
      if (wasPlaying) {
        audio.play().catch(() => {});
      }
      updateNowPlaying(wasPlaying ? 'Playing' : 'Ready');
      const prefs = loadMusicPrefs();
      saveMusicPrefs({
        ...prefs,
        track: trackSelect.value,
        shouldPlay: wasPlaying,
      });
    });
  }

  /**
   * Attach handlers for the overlay enable/disable toggle.
   */
  function initOverlayControls(initialOverlayEnabled) {
    overlayEnabled = initialOverlayEnabled;
    updateOverlayToggleState();
    const overlayToggle = document.getElementById('overlayToggle');
    overlayToggle.addEventListener('change', () => {
      overlayEnabled = overlayToggle.checked;
      persistOverlay(overlayEnabled);
      updateOverlayToggleState();
      startOverlay();
    });
  }

  /**
   * Load the persisted overlay enabled flag from localStorage.
   */
  function loadOverlayPref() {
    const stored = localStorage.getItem(OVERLAY_KEY);
    if (stored === null) return true;
    try {
      return JSON.parse(stored);
    } catch (e) {
      return true;
    }
  }

  /**
   * Primary entry point that wires up theming, overlays, media, and navigation.
   */
  function init() {
    setCanvasSize();
    const initialTheme = getInitialTheme();
    initThemeSwitcher(initialTheme);
    overlayEnabled = loadOverlayPref();
    initOverlayControls(overlayEnabled);
    initGallery();
    initNavigation();
    initMusic();
    startOverlay();
    window.addEventListener('resize', handleResize);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
