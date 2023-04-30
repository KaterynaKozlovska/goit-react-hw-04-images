import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import ButtonLoadMore from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import imageFinderApi from 'components/imageFinderApi';

class ImageGallery extends Component {
  static propTypes = {
    imageName: PropTypes.string.isRequired,
    getModalContent: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
  };
  state = {
    fetchImages: [],
    page: 1,
    query: null,
    showButton: false,
    isLoading: false,
    itemToScroll: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, fetchImages, itemToScroll, query } = this.state;
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName) {
      this.setState({
        query: nextName,
        page: 1,
        fetchImages: [],
        itemToScroll: null,
      });
    }

    if (prevState.query !== query || prevState.page !== page) {
      this.getImages();
      return;
    }
    if (prevState.fetchImages !== fetchImages && page > 1) {
      document.getElementById(itemToScroll)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  getImages = async () => {
    const { page, fetchImages } = this.state;
    const query = this.props.imageName;

    this.setState({ isLoading: true });

    const data = await imageFinderApi(query, page);

    try {
      if (data.total === 0) {
        this.setState({
          fetchImages: [],
          page: 1,
          showButton: false,
        });
        return;
      }

      const quantityOfPage = data.total / 12;
      this.setState({
        showButton: quantityOfPage > page ? true : false,
      });

      this.setState({
        fetchImages: page === 1 ? data.hits : [...fetchImages, ...data.hits],
        itemToScroll: page === 1 ? null : data.hits[data.hits.length - 1].id,
      });
    } catch {
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreImages = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      showButton: false,
    }));
  };

  openModal = event => {
    if (event.target.nodeName === 'IMG') {
      this.props.openModal();
    }
  };

  getItemContent = (largeImageURL, tags) => {
    const modalContent = {
      largeImageURL,
      tags,
    };

    this.props.getModalContent(modalContent);
  };

  render() {
    const { fetchImages, showButton, isLoading } = this.state;

    return (
      <>
        {fetchImages.length > 0 && (
          <ul className={css.ImageGallery} onClick={this.openModal}>
            {fetchImages.map(
              ({ id, tags, webformatURL, largeImageURL }, item) => (
                <ImageGalleryItem
                  key={item}
                  imageUrl={webformatURL}
                  imageTag={tags}
                  largeImageURL={largeImageURL}
                  getItemContent={this.getItemContent}
                  id={id}
                />
              )
            )}
          </ul>
        )}

        {isLoading ? (
          <Loader />
        ) : (
          showButton && (
            <ButtonLoadMore onloadMoreImages={this.loadMoreImages} />
          )
        )}
      </>
    );
  }
}

export default ImageGallery;
