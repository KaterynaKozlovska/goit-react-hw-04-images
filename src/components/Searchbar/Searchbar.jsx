import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(searchQuery);
    reset();
  };

  const reset = () => {
    setSearchQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm__button}>
          <span className={css.SearchForm__button__label}>Search</span>
        </button>

        <input
          className={css.SearchForm__input}
          onChange={handleChange}
          name="searchQuery"
          value={searchQuery}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
