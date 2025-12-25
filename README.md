# Seasonal Gallery (React + Vite)

A GitHub Pages–ready single-page app with seasonal theming, animated overlays, an HTML5 music player, and a responsive photo gallery.

## Quick start

```bash
npm install
npm run dev
```

Open the printed local URL in your browser. The app uses `HashRouter` so refreshes will not 404 on GitHub Pages.

## Building

```bash
npm run build
```

Static files output to `dist/`. Deploy that folder to GitHub Pages.

### GitHub Pages base path

Vite needs the `base` option to match your project site name. Update `repoName` in `vite.config.js` (currently `KZesty.github.io`) if you rename the repository. The base should be `/<repo-name>/`.

## Adding assets

- Place audio files in `public/audio/`. Update `src/components/MusicPlayer.jsx` to add options if you include multiple tracks.
- Place photos in `public/photos/`. Add entries in `src/components/PhotoGallery.jsx` (or load dynamically) to control ordering and captions.

## Features
- Seasonal theming (default, Christmas, Valentine’s) with date-based auto-selection and `?theme=` override.
- Toggleable snow or heart overlays per theme.
- HTML5 audio player with remembered play/pause state (no forced autoplay).
- Responsive, lazy-loaded photo grid designed to scale to hundreds of images.
- Persistent header navigation across Home, Gallery, and About pages via `HashRouter`.
