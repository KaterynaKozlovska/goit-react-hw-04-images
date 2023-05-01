const API_KEY = '35732068-86247d7683f9f768af69bf612';
const BASE_URL = 'https://pixabay.com/api';

export default async function imageFinderApi(name, page) {
  const response = await fetch(
    `${BASE_URL}/?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.ok
    ? response.json()
    : Promise.reject(
        new Error('Images has not been found. Please, check your request!')
      );
}
