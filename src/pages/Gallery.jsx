import React from 'react';
import PhotoGallery from '../components/PhotoGallery';

const Gallery = () => (
  <div className="page">
    <section className="card">
      <h3>Gallery</h3>
      <p>Images are loaded from <code>/public/photos</code> and lazy-load as you scroll.</p>
    </section>
    <PhotoGallery />
  </div>
);

export default Gallery;
