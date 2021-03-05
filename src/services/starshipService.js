import axios from 'axios';

export const getStarships = () =>
  axios.get('http://swapi.dev/api/starships/');