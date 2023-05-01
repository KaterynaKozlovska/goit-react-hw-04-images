import React from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, ...otherProps }) => {
  return (
    <>
      <ul className={css.gallery} id="gallery">
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            original={largeImageURL}
            preview={webformatURL}
            description={tags}
            {...otherProps}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  otherProps: PropTypes.any.isRequired,
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
