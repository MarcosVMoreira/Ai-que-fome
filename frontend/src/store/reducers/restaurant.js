import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  restaurants: null,
};

const fetchRestaurantsStart = state => ({
  ...state,
  error: null,
  loading: true,
});

const fetchRestaurantsSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  restaurants: payload.restaurants,
});

const fetchRestaurantsFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
  states: null,
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_RESTAURANTS_START:
      return fetchRestaurantsStart(state);
    case actionTypes.FETCH_RESTAURANTS_SUCCESS:
      return fetchRestaurantsSuccess(state, payload);
    case actionTypes.FETCH_RESTAURANTS_FAIL:
      return fetchRestaurantsFail(state, payload);
    default:
      return state;
  }
};

export default reducer;
