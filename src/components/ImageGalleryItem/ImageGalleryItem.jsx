import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from '../Modal/Modal';

const ImageGalleryItem = ({ imageUrl, largeImageURL, imageTag }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItem__image}
        src={imageUrl}
        alt={imageTag}
        largeImageURL={largeImageURL}
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <Modal onCloseModal={onCloseModal}>
          <img src={largeImageURL} alt={imageTag} />
        </Modal>
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageTag: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
