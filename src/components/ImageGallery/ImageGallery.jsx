import { useState, useEffect } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import ButtonLoadMore from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import imageFinderApi from 'components/imageFinderApi';

const ImageGallery = ({}) => {
  const [fetchImages, setFetchImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState(false);
  // state = {
  //   fetchImages: [],
  //   page: 1,
  //   query: null,
  //   showButton: false,
  //   isLoading: false,
  //   itemToScroll: null,
  // };

  // componentDidUpdate(prevProps, prevState) {
  //   const { page, fetchImages, itemToScroll, query } = this.state;
  //   const prevName = prevProps.imageName;
  //   const nextName = this.props.imageName;

  //   if (prevName !== nextName) {
  //     this.setState({
  //       query: nextName,
  //       page: 1,
  //       fetchImages: [],
  //       itemToScroll: null,
  //     });
  //   }

  //   if (prevState.query !== query || prevState.page !== page) {
  //     this.getImages();
  //     return;
  //   }
  //   if (prevState.fetchImages !== fetchImages && page > 1) {
  //     document.getElementById(itemToScroll)?.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'start',
  //     });
  //   }
  // }
  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(isLoading);

    fetchImages({ query: query, page })
      .then(responseImages => {
        if (page > 1) {
          setFetchImages(prevImages => [...prevImages, ...responseImages]);
          setError(false);
        } else {
          setFetchImages([...responseImages]);
          setError(false);
        }
      })
      .catch(error => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, [page, query]);

  //     const quantityOfPage = data.total / 12;
  //     this.setState({
  //       showButton: quantityOfPage > page ? true : false,
  //     });

  //     this.setState({
  //       fetchImages: page === 1 ? data.hits : [...fetchImages, ...data.hits],
  //       itemToScroll: page === 1 ? null : data.hits[data.hits.length - 1].id,
  //     });
  //   } catch {
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
    setShowButton(showButton);
  };

  const openModal = event => {
    if (event.target.nodeName === 'IMG') {
      openModal();
    }
  };

  const getItemContent = (largeImageURL, tags) => {
    const modalContent = {
      largeImageURL,
      tags,
    };

    this.props.getModalContent(modalContent);
  };

  return (
    <>
      {fetchImages.length > 0 && (
        <ul className={css.ImageGallery} onClick={openModal}>
          {fetchImages.map(
            ({ id, tags, webformatURL, largeImageURL }, item) => (
              <ImageGalleryItem
                key={item}
                imageUrl={webformatURL}
                imageTag={tags}
                largeImageURL={largeImageURL}
                getItemContent={getItemContent}
                id={id}
              />
            )
          )}
        </ul>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        showButton && <ButtonLoadMore onloadMoreImages={loadMoreImages} />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  imageName: PropTypes.array.isRequired,
  getModalContent: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
