import * as actions from './actionTypes';

const setCategoryStart = () => {
  return {
    type: actions.SET_CATEGORY_START,
  };
};
const setCategorySuccess = (categories) => {
  return {
    type: actions.SET_CATEGORY_SUCCESS,
    categories,
  };
};
const setCategoryFail = (error) => {
  return {
    type: actions.SET_CATEGORY_FAIL,
    error,
  };
};

export const createCategory = (name) => {
  return (dispatch) => {
    dispatch(setCategoryStart());
    console.log(name);
    fetch('http://localhost:8080/categories/category', {
      method: 'POST',
      body: name,
    })
      .then((res) => res.json())
      .then((resData) => dispatch(setCategorySuccess(resData.categories)))
      .catch((err) => dispatch(setCategoryFail(err)));
  };
};
