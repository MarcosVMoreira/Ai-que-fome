import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  customer: null,
};

const customerDataStart = state => ({
  ...state,
  loading: true,
});

const customerDataSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  customer: payload.customer,
});

const customerDataFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const customerEditDataStart = state => ({
  ...state,
  loading: true,
});

const customerEditDataSuccess = state => ({
  ...state,
  error: null,
  loading: false,
});

const customerEditDataFail = (state, payload) => ({
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
    case actionTypes.CUSTOMER_DATA_START:
      return customerDataStart(state);
    case actionTypes.CUSTOMER_DATA_SUCCESS:
      return customerDataSuccess(state, payload);
    case actionTypes.CUSTOMER_DATA_FAIL:
      return customerDataFail(state, payload);
    case actionTypes.CUSTOMER_EDIT_DATA_START:
      return customerEditDataStart(state);
    case actionTypes.CUSTOMER_EDIT_DATA_SUCCESS:
      return customerEditDataSuccess(state);
    case actionTypes.CUSTOMER_EDIT_DATA_FAIL:
      return customerEditDataFail(state, payload);
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
