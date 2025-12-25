import React from 'react';

const photos = [
  {
    src: '/photos/aurora.svg',
    alt: 'Aurora gradient sky',
    caption: 'Cool tones for winter nights'
  },
  {
    src: '/photos/bouquet.svg',
    alt: 'Bouquet illustration',
    caption: 'Warm blooms for Valentine\'s week'
  },
  {
    src: '/photos/dunes.svg',
    alt: 'Sunset dunes',
    caption: 'A calm default scene'
  }
];

const PhotoGallery = () => {
  return (
    <section className="gallery-grid">
      {photos.map((photo, index) => (
        <figure key={photo.src + index}>
          <img src={photo.src} alt={photo.alt} loading="lazy" />
          {photo.caption && <figcaption>{photo.caption}</figcaption>}
        </figure>
      ))}
    </section>
  );
};

export default PhotoGallery;
