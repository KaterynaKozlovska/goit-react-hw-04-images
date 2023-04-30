import PropTypes from 'prop-types';
import css from './Button.module.css';

const ButtonLoadMore = ({ onloadMoreImages }) => {
  return (
    <button className={css.Button} onClick={onloadMoreImages}>
      Load more
    </button>
  );
};
ButtonLoadMore.propTypes = {
  onloadMoreImages: PropTypes.func.isRequired,
};
export default ButtonLoadMore;
