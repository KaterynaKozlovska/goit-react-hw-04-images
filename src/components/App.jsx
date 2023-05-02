import { useState, useEffect } from 'react';
import { default as Searchbar } from './Searchbar/Searchbar';
import { default as ImageGallery } from './ImageGallery/ImageGallery';
import css from './app.module.css';
import Modal from './Modal/Modal';
import ButtonLoadMore from './Button/Button';
import imageFinderApi from './imageFinderApi';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalDescr, setModalDescr] = useState('');
  const [modalImg, setModalImg] = useState('');
  const [showScroll, setShowScroll] = useState(false);
  const [error, setError] = useState(null);

  const totalPage = Math.ceil(totalHits / pageSize);

  useEffect(() => {
    if (searchQuery === '') return;

    async function getImages() {
      setIsLoading(true);
      const options = { searchQuery, currentPage, pageSize };
      try {
        const { data } = await imageFinderApi(options);
        setImages(prevImages => [...prevImages, ...responseImages]);
        setTotalHits(data.total.hits);
        setShowScroll(true);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    const handleScroll = () => {
      document.addEventListener('scroll', () => {
        const GOLDEN_RATIO = 0.5;
        document.documentElement.scrollTop > GOLDEN_RATIO
          ? setShowScroll(true)
          : setShowScroll(false);
      });
    };

    getImages();
    handleScroll();
  }, [currentPage, pageSize, searchQuery]);

  const handleFormSubmit = searchQuery => {
    reset();
    setSearchQuery(searchQuery);
  };

  const handleLoadMore = () => {
    incrementCurrentPage();
  };

  const handleModal = (modalDescr, modalImg) => {
    setModalDescr(modalDescr);
    setModalImg(modalImg);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const incrementCurrentPage = () => {
    setCurrentPage(state => state + 1);
  };

  const reset = () => {
    setImages([]);
    setSearchQuery('');
    setCurrentPage(1);
    setPageSize(12);
    setTotalHits(0);
    setIsLoading(false);
    setShowModal(false);
    setModalDescr('');
    setModalImg('');
    setShowScroll(false);
    setError(null);
  };
  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length > 0 && !isLoading && (
        <ImageGallery images={images} onImageClick={handleModal} />
      )}
      {currentPage < totalPage && !isLoading && (
        <ButtonLoadMore text="Load more" onClick={handleLoadMore} />
      )}
      {showModal && (
        <Modal
          onClick={toggleModal}
          modalImg={modalImg}
          modalDescr={modalDescr}
        />
      )}
    </div>
  );
};
export default App;
