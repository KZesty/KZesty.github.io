const themes = ['default', 'christmas', 'valentines'];
const overlayContainer = document.getElementById('overlayContainer');
const sideWreaths = document.querySelectorAll('.side-wreath');
let activeTheme = 'default';
let overlayEnabled = true;

function seasonalDefaultTheme(now = new Date()) {
  return 'christmas';
}

function updateQuery(theme) {
  const url = new URL(window.location.href);
  url.searchParams.set('theme', theme);
  history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
}

function setTheme(themeName) {
  if (!themes.includes(themeName)) {
    themeName = seasonalDefaultTheme();
  }
  activeTheme = themeName;
  document.body.classList.remove(...themes.map((t) => `theme-${t}`));
  document.body.classList.add(`theme-${themeName}`);
  const label = document.getElementById('themeLabel');
  const currentTheme = document.getElementById('currentTheme');
  if (label) label.textContent = titleCase(themeName);
  if (currentTheme) currentTheme.textContent = titleCase(themeName);
  if (sideWreaths.length) {
    sideWreaths.forEach((wreath) => wreath.classList.toggle('visible', themeName === 'christmas'));
  }
  renderOverlay();
  syncOverlayStatus();
  updateQuery(themeName);
}

function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getEmbedUrl() {
  const config = window.APP_CONFIG || {};
  return config.VITE_ICLOUD_EMBED_URL || '';
}

function renderAlbumEmbed() {
  const container = document.getElementById('albumEmbed');
  if (!container) return;
  const url = getEmbedUrl();
  container.innerHTML = '';
  if (url) {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.loading = 'lazy';
    iframe.allow = 'encrypted-media; fullscreen';
    container.appendChild(iframe);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'placeholder';
    placeholder.textContent = 'Add your iCloud embed URL to show the full-height album here.';
    container.appendChild(placeholder);
  }
}

function renderOverlay() {
  if (!overlayContainer) return;
  overlayContainer.innerHTML = '';
  if (!overlayEnabled) return;

  if (activeTheme === 'christmas') {
    createParticles('snowflake', 80);
  } else if (activeTheme === 'valentines') {
    createParticles('heart', 50);
  }
}

function createParticles(type, count) {
  const width = window.innerWidth;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = type;
    const size = type === 'snowflake' ? randomBetween(4, 10) : randomBetween(10, 18);
    el.style.setProperty('--size', `${size}px`);
    el.style.setProperty('--x', `${Math.random() * width}px`);
    el.style.setProperty('--duration', `${randomBetween(10, 22)}s`);
    el.style.setProperty('--delay', `${Math.random() * 10}s`);
    overlayContainer.appendChild(el);
  }
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function toggleOverlay() {
  overlayEnabled = !overlayEnabled;
  renderOverlay();
  syncOverlayStatus();
}

function wireOverlayButtons() {
  const buttons = document.querySelectorAll('[data-overlay-toggle]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', toggleOverlay);
  });
}

function setupMusic() {
  const audio = document.getElementById('audio');
  const playPause = document.getElementById('playPause');
  const musicStatus = document.getElementById('musicStatus');
  if (!audio || !playPause) return;

  playPause.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', () => {
    playPause.textContent = 'Pause';
    if (musicStatus) musicStatus.textContent = 'Playing';
  });

  audio.addEventListener('pause', () => {
    playPause.textContent = 'Play';
    if (musicStatus) musicStatus.textContent = 'Ready';
  });
}

function setupThemeButtons() {
  document.querySelectorAll('[data-use-theme]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-use-theme');
      setTheme(theme);
    });
  });
}

function applyInitialTheme() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('theme');
  const initial = requested && themes.includes(requested) ? requested : seasonalDefaultTheme();
  overlayEnabled = activeTheme !== 'default' ? overlayEnabled : true;
  setTheme(initial);
}

function syncOverlayStatus() {
  const overlayStatus = document.getElementById('overlayStatus');
  const overlayStatusSmall = document.getElementById('overlayStatusSmall');
  const statusText = overlayEnabled ? 'On' : 'Off';
  if (overlayStatus) overlayStatus.textContent = statusText;
  if (overlayStatusSmall) overlayStatusSmall.textContent = statusText;
}

function init() {
  applyInitialTheme();
  renderAlbumEmbed();
  wireOverlayButtons();
  setupMusic();
  setupThemeButtons();
  window.addEventListener('resize', renderOverlay);

  setupMarquee();
  showGiftModal();
}

document.addEventListener('DOMContentLoaded', init);

function setupMarquee() {
  const track = document.getElementById('marqueeTrack');
  if (!track) return;

  const images = [
    'photos/uploaded/HolidayGallery/IMG_4019.png',
    'photos/uploaded/HolidayGallery/IMG_4020.png',
    'photos/uploaded/HolidayGallery/IMG_4021.png',
    'photos/uploaded/HolidayGallery/IMG_5184.png'
  ];

  const slides = [...images, ...images];
  slides.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Holiday gallery photo ${index + 1}`;
    img.loading = 'lazy';
    track.appendChild(img);
  });
}

function showGiftModal() {
  const modal = document.getElementById('giftModal');
  if (!modal) return;
  modal.hidden = false;
}
