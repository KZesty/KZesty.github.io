import React from 'react';

const About = () => (
  <div className="page">
    <section className="card">
      <h3>About</h3>
      <p>
        Built with React, Vite, and HashRouter to stay friendly with GitHub Pages. Animations use lightweight DOM elements and
        CSS keyframes—no external services required.
      </p>
      <p>
        The gallery is intentionally simple. Add more files to <code>public/photos/</code> and extend the list in
        <code>PhotoGallery.jsx</code> to scale to hundreds of images without changing the layout or performance characteristics.
      </p>
    </section>
  </div>
);

export default About;
