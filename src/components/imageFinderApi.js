import axios from 'axios';
import PropTypes from 'prop-types';

const API_KEY = '35732068-86247d7683f9f768af69bf612';
const BASE_URL = 'https://pixabay.com/api';

const imageFinderApi = ({ searchQuery, currentPage, pageSize }) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: currentPage,
    per_page: pageSize,
  });

  return axios.get(`?${searchParams}`);
};

imageFinderApi.propTypes = {
  searchQuery: PropTypes.string,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
};

export default imageFinderApi;
