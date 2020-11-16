import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  addresses: [],
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

const customerNewAddressStart = state => ({
  ...state,
  loading: true,
});

const customerNewAddressSuccess = state => ({
  ...state,
  error: null,
  loading: false,
});

const customerNewAddressFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const customerEditAddressStart = state => ({
  ...state,
  loading: true,
});

const customerEditAddressSuccess = state => ({
  ...state,
  error: null,
  loading: false,
});

const customerEditAddressFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const customerRemoveAddressStart = state => ({
  ...state,
  loading: true,
});

const customerRemoveAddressSuccess = state => ({
  ...state,
  error: null,
  loading: false,
});

const customerRemoveAddressFail = (state, payload) => ({
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
    case actionTypes.CUSTOMER_NEW_ADDRESS_START:
      return customerNewAddressStart(state);
    case actionTypes.CUSTOMER_NEW_ADDRESS_SUCCESS:
      return customerNewAddressSuccess(state);
    case actionTypes.CUSTOMER_NEW_ADDRESS_FAIL:
      return customerNewAddressFail(state, payload);
    case actionTypes.CUSTOMER_EDIT_ADDRESS_START:
      return customerEditAddressStart(state);
    case actionTypes.CUSTOMER_EDIT_ADDRESS_SUCCESS:
      return customerEditAddressSuccess(state);
    case actionTypes.CUSTOMER_EDIT_ADDRESS_FAIL:
      return customerEditAddressFail(state, payload);
    case actionTypes.CUSTOMER_REMOVE_ADDRESS_START:
      return customerRemoveAddressStart(state);
    case actionTypes.CUSTOMER_REMOVE_ADDRESS_SUCCESS:
      return customerRemoveAddressSuccess(state);
    case actionTypes.CUSTOMER_REMOVE_ADDRESS_FAIL:
      return customerRemoveAddressFail(state, payload);
    default:
      return state;
  }
};

export default reducer;
