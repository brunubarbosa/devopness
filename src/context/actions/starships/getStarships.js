// import axiosInstance from "../../../helpers/axiosInstance";
import { CONNECTION_ERROR } from "../../../constants/api";
import { getStarships } from "../../../services/starshipService";
import {
  STARSHIPS_LOADING,
  STARSHIPS_LOAD_SUCCESS,
  STARSHIPS_LOAD_ERROR,
} from "../../../constants/actionTypes";

const getStarshipsAction = (dispatch, url) => {
  if (!url) return;
  dispatch({
    type: STARSHIPS_LOADING,
  });
  getStarships(url)
    .then((res) => {
      dispatch({
        type: STARSHIPS_LOAD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: STARSHIPS_LOAD_ERROR,
        payload: err.response ? err.response.data : CONNECTION_ERROR,
      });
    });
};

export default getStarshipsAction;