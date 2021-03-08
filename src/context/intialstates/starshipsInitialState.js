import viewType from '../../constants/listType';

const starshipsInitialState = {
  starships: {
    loading: false,
    error: null,
    data: [],
    next: 'https://swapi.dev/api/starships/',
    viewType: viewType.GRID,
  },
};

export default starshipsInitialState;