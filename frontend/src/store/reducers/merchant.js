import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  merchant: null,
};

const merchantDataStart = state => ({
  ...state,
  loading: true,
});

const merchantDataSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  merchant: payload.merchant,
});

const merchantDataFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const merchantEditDataStart = state => ({
  ...state,
  loading: true,
});

const merchantEditDataSuccess = state => ({
  ...state,
  error: null,
  loading: false,
});

const merchantEditDataFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.MERCHANT_DATA_START:
      return merchantDataStart(state);
    case actionTypes.MERCHANT_DATA_SUCCESS:
      return merchantDataSuccess(state, payload);
    case actionTypes.MERCHANT_DATA_FAIL:
      return merchantDataFail(state, payload);
    case actionTypes.MERCHANT_EDIT_DATA_START:
      return merchantEditDataStart(state);
    case actionTypes.MERCHANT_EDIT_DATA_SUCCESS:
      return merchantEditDataSuccess(state);
    case actionTypes.MERCHANT_EDIT_DATA_FAIL:
      return merchantEditDataFail(state, payload);
    default:
      return state;
  }
};

export default reducer;
