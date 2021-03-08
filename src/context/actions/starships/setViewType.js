import { SET_LIST_TYPE } from "../../../constants/actionTypes";

const setViewType = (dispatch, newViewType) => {
  dispatch({
    type: SET_LIST_TYPE,
    payload: {newViewType}
  });
};
export default setViewType;