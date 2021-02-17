import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  orders: null,
  order: null,
  orderId: null,
};

const newOrderStart = state => ({
  ...state,
  loading: true,
});

const newOrderSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  orderId: payload.orderId,
});

const newOrderFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const resetOrderId = state => ({
  ...state,
  orderId: null,
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.NEW_ORDER_START:
      return newOrderStart(state);
    case actionTypes.NEW_ORDER_SUCCESS:
      return newOrderSuccess(state, payload);
    case actionTypes.NEW_ORDER_FAIL:
      return newOrderFail(state, payload);
    case actionTypes.RESET_ORDER_ID:
      return resetOrderId(state);
    default:
      return state;
  }
};

export default reducer;
