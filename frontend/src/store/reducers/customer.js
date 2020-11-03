import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  addresses: [],
  postalCode: null,
};

const customerAddressStart = state => ({
  ...state,
  loading: true,
});

const customerAddressSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  addresses: payload.customer.addresses,
});

const customerAddressFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const viaCepStart = state => ({
  ...state,
  loading: true,
});

const viaCepSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  postalCode: payload.postalCode,
});

const viaCepFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.CUSTOMER_ADDRESS_START:
      return customerAddressStart(state);
    case actionTypes.CUSTOMER_ADDRESS_SUCCESS:
      return customerAddressSuccess(state, payload);
    case actionTypes.CUSTOMER_ADDRESS_FAIL:
      return customerAddressFail(state, payload);
    case actionTypes.VIACEP_START:
      return viaCepStart(state);
    case actionTypes.VIACEP_SUCCESS:
      return viaCepSuccess(state, payload);
    case actionTypes.VIACEP_FAIL:
      return viaCepFail(state, payload);
    default:
      return state;
  }
};

export default reducer;
