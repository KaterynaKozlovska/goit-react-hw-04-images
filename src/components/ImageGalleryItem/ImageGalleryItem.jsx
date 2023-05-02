import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  id,
  preview,
  original,
  description,
  onImageClick,
}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        key={id}
        className={css.ImageGalleryItem__image}
        src={preview}
        data-source={original}
        alt={description}
        onClick={() => {
          onImageClick(description, original);
        }}
        loading="lazy"
        width="240"
        height="170"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  preview: PropTypes.string.isRequired,
  original: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
