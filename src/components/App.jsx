import { useState, useEffect } from 'react';
import { default as Searchbar } from './Searchbar/Searchbar';
import { default as ImageGallery } from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import css from './app.module.css';

const App = () => {
  const [imageName, setImageNames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(false);
  // state = {
  //   imageName: '',
  //   showModal: false,
  //   modalContent: null,
  // };
  const handleFormSubmit = imageName => {
    setImageNames(imageName);
  };

  const toggleModal = () => {
    setShowModal(showModal);
  };
  const getModalContent = modalContent => {
    setModalContent(modalContent);
  };
  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        getModalContent={getModalContent}
        imageName={imageName}
        openModal={toggleModal}
      />
      {showModal && <Modal onClose={toggleModal} data={modalContent} />}
    </div>
  );
};
export default App;
