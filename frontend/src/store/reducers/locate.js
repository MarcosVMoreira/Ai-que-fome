import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  states: null,
  cities: null,
  address: null,
};

const fetchStatesStart = state => ({
  ...state,
  error: null,
  loading: true,
});

const fetchStatesSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  states: payload.states,
});

const fetchStatesFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
  states: null,
});

const fetchCitiesStart = state => ({
  ...state,
  error: null,
  loading: true,
});

const fetchCitiesSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  cities: payload.cities,
});

const fetchCitiesFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
  cities: null,
});

const fetchAddressStart = state => ({
  ...state,
  error: null,
  loading: true,
});

const fetchAddressSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  address: payload.address,
});

const fetchAddressFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
  address: null,
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_STATES_START:
      return fetchStatesStart(state);
    case actionTypes.FETCH_STATES_SUCCESS:
      return fetchStatesSuccess(state, payload);
    case actionTypes.FETCH_STATES_FAIL:
      return fetchStatesFail(state, payload);
    case actionTypes.FETCH_CITIES_START:
      return fetchCitiesStart(state);
    case actionTypes.FETCH_CITIES_SUCCESS:
      return fetchCitiesSuccess(state, payload);
    case actionTypes.FETCH_CITIES_FAIL:
      return fetchCitiesFail(state, payload);
    case actionTypes.FETCH_ADDRESS_START:
      return fetchAddressStart(state);
    case actionTypes.FETCH_ADDRESS_SUCCESS:
      return fetchAddressSuccess(state, payload);
    case actionTypes.FETCH_ADDRESS_FAIL:
      return fetchAddressFail(state, payload);
    default:
      return state;
  }
};

export default reducer;
