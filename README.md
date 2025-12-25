# Seasonal Microsite (static)

A GitHub Pages–ready, build-free seasonal microsite with:

- Date- and query-based themes (default, Christmas, Valentines)
- Canvas snow and hearts overlays with a toggle
- LocalStorage-backed music player
- Responsive, lazy-loaded gallery backed by `gallery.js`

## Usage

1. Clone the repo.
2. Open `index.html` directly in your browser or serve the folder on GitHub Pages. No npm or build step required.

## Customizing

- **Themes**: Adjust colors in `app.js` under the `themes` object. Force a theme with `?theme=christmas`, `?theme=valentines`, or `?theme=default`.
- **Gallery**: Edit `gallery.js` to add or reorder images. Drop your files in `assets/photos/`.
- **Music**: Replace placeholder MP3s in `assets/audio/` and update the select options in `index.html` if you add more tracks.
- **Overlays**: Toggle snow/hearts per theme in `app.js` via the `overlay` property.

## Notes

- Overlay and music preferences persist locally through `localStorage`.
- The site is responsive and uses only HTML, CSS, and vanilla JavaScript.
