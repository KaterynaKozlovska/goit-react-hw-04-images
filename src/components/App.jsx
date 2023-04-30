import { Component } from 'react';
import { default as Searchbar } from './Searchbar/Searchbar';
import { default as ImageGallery } from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import css from './app.module.css';

export class App extends Component {
  state = {
    imageName: '',
    showModal: false,
    modalContent: null,
  };
  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  getModalContent = modalContent => {
    this.setState({ modalContent });
  };
  render() {
    const { showModal, modalContent, imageName } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          getModalContent={this.getModalContent}
          imageName={imageName}
          openModal={this.toggleModal}
        />
        {showModal && <Modal onClose={this.toggleModal} data={modalContent} />}
      </div>
    );
  }
}
export default App;
