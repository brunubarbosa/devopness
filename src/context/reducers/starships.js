import {
  STARSHIPS_LOADING,
  STARSHIPS_LOAD_SUCCESS,
  STARSHIPS_LOAD_ERROR,
  SET_LIST_TYPE,
} from "../../constants/actionTypes";

const starships = (state, { payload, type }) => {
  switch (type) {
    case STARSHIPS_LOADING: {
      return {
        ...state,
        starships: {
          ...state.starships,
          loading: true,
        },
      };
    }

    case STARSHIPS_LOAD_SUCCESS: {
      return {
        ...state,
        starships: {
          ...state.starships,
          loading: false,
          data: [...state.starships.data, ...payload.results],
          next: payload.next,
          count: payload.count,
        },
      };
    }
    case STARSHIPS_LOAD_ERROR: {
      return {
        ...state,
        starships: {
          ...state.starships,
          loading: false,
          error: payload,
        },
      };
    }

    case SET_LIST_TYPE: {
      return {
        ...state,
        starships: {
          ...state.starships,
          viewType: payload.newViewType,
        },
      };
    }

    default:
      return state;
  }
};

export default starships;
