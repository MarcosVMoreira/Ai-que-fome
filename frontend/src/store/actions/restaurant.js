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

export const fetchRestaurants = payload => {
  return dispatch => {
    dispatch(fetchRestaurantsStart());

    const coordinates = payload.coordinates.join(',');

    axios
      .get(`/merchant/merchants?customerCoords=${coordinates}`)
      .then(res => {
        dispatch(
          fetchRestaurantsSuccess({
            restaurants: res.data.content,
            filter: false,
          }),
        );
      })
      .catch(err => {
        dispatch(fetchRestaurantsFail({ error: err.response?.status || 500 }));
      });
  };
};

export const fetchRestaurantsFilter = payload => {
  return dispatch => {
    dispatch(fetchRestaurantsStart());

    const coordinates = payload.coordinates.join(',');
    let url = `/merchant/merchants?customerCoords=${coordinates}`;

    if (payload.name) {
      url += `&name=${payload.name}`;
    }

    if (payload.type) {
      url += `&type=${payload.type}`;
    }

    if (payload.fee === 0 || payload.fee) {
      url += `&fee=${payload.fee}`;
    }

    if (payload.payment) {
      url += `&payment=${payload.payment}`;
    }

    if (payload.distance) {
      url += `&distance=${payload.distance}`;
    }

    axios
      .get(url)
      .then(res => {
        dispatch(
          fetchRestaurantsSuccess({
            restaurants: res.data.content,
            filter: true,
          }),
        );
      })
      .catch(err => {
        dispatch(fetchRestaurantsFail({ error: err.response?.status || 500 }));
      });
  };
};

export const fetchRestaurantStart = () => ({
  type: actionTypes.FETCH_RESTAURANT_START,
});

export const fetchRestaurantSuccess = payload => ({
  type: actionTypes.FETCH_RESTAURANT_SUCCESS,
  payload,
});

export const fetchRestaurantFail = payload => ({
  type: actionTypes.FETCH_RESTAURANT_FAIL,
  payload,
});

export const fetchRestaurant = restaurantId => {
  return dispatch => {
    dispatch(fetchRestaurantStart());

    axios
      .get(`/merchant/merchants/${restaurantId}`)
      .then(res => {
        dispatch(fetchRestaurantSuccess({ restaurant: res.data }));
      })
      .catch(err => {
        dispatch(fetchRestaurantFail({ error: err.response?.status || 500 }));
      });
  };
};
