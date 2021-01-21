import axios from '../../Axios';
import * as actionTypes from './actionTypes';

export const fetchRestaurantsStart = () => ({
  type: actionTypes.FETCH_RESTAURANTS_START,
});

export const fetchRestaurantsSuccess = payload => ({
  type: actionTypes.FETCH_RESTAURANTS_SUCCESS,
  payload,
});

export const fetchRestaurantsFail = payload => ({
  type: actionTypes.FETCH_RESTAURANTS_FAIL,
  payload,
});

export const fetchRestaurants = () => {
  return dispatch => {
    dispatch(fetchRestaurantsStart());

    axios
      .get(`/merchant/merchants`)
      .then(res => {
        dispatch(fetchRestaurantsSuccess({ restaurants: res.data.content }));
      })
      .catch(err => {
        dispatch(fetchRestaurantsFail({ error: err.response?.status || 500 }));
      });
  };
};
