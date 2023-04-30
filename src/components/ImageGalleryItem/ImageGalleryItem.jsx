import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  imageUrl,
  imageTag,
  largeImageURL,
  getItemContent,
  id,
}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItem__image}
        src={imageUrl}
        alt={imageTag}
        largeImageURL={largeImageURL}
        onClick={() => getItemContent(largeImageURL, imageTag)}
        id={id}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageTag: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  getItemContent: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
