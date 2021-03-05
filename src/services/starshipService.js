import axios from 'axios';

export const getStarships = () =>
  axios.get('https://swapi.dev/api/starships/');