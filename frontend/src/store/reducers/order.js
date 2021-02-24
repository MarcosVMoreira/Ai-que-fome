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

const fetchOrderStart = state => ({
  ...state,
  error: null,
  loading: true,
});

const fetchOrderSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  order: payload.order,
});

const fetchOrderFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
  order: null,
});

const fetchOrdersStart = state => ({
  ...state,
  error: null,
  loading: true,
});

const fetchOrdersSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  orders: payload.orders,
});

const fetchOrdersFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
  orders: null,
});

const orderEditPaymentStart = state => ({
  ...state,
  error: null,
  loading: true,
});

const orderEditPaymentSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  order: payload.order,
});

const orderEditPaymentFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
  order: null,
});

const orderRateStart = state => ({
  ...state,
  error: null,
  loading: true,
});

const orderRateSuccess = state => ({
  ...state,
  error: null,
  loading: false,
});

const orderRateFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const resetOrder = state => ({
  ...state,
  order: null,
});

const resetOrders = state => ({
  ...state,
  orders: null,
  order: null,
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
    case actionTypes.FETCH_ORDER_START:
      return fetchOrderStart(state);
    case actionTypes.FETCH_ORDER_SUCCESS:
      return fetchOrderSuccess(state, payload);
    case actionTypes.FETCH_ORDER_FAIL:
      return fetchOrderFail(state, payload);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, payload);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, payload);
    case actionTypes.ORDER_EDIT_PAYMENT_START:
      return orderEditPaymentStart(state);
    case actionTypes.ORDER_EDIT_PAYMENT_SUCCESS:
      return orderEditPaymentSuccess(state, payload);
    case actionTypes.ORDER_EDIT_PAYMENT_FAIL:
      return orderEditPaymentFail(state, payload);

    case actionTypes.ORDER_RATE_START:
      return orderRateStart(state);
    case actionTypes.ORDER_RATE_SUCCESS:
      return orderRateSuccess(state);
    case actionTypes.ORDER_RATE_FAIL:
      return orderRateFail(state, payload);

    case actionTypes.RESET_ORDER:
      return resetOrder(state);
    case actionTypes.RESET_ORDERS:
      return resetOrders(state);
    case actionTypes.RESET_ORDER_ID:
      return resetOrderId(state);
    default:
      return state;
  }
};

export default reducer;
