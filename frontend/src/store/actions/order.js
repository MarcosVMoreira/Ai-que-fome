import { add, format } from 'date-fns';
import axios from '../../Axios';
import * as actionTypes from './actionTypes';

export const newOrderStart = () => ({
  type: actionTypes.NEW_ORDER_START,
});

export const newOrderSuccess = payload => ({
  type: actionTypes.NEW_ORDER_SUCCESS,
  payload,
});

export const newOrderFail = payload => ({
  type: actionTypes.NEW_ORDER_FAIL,
  payload,
});

export const newOrder = payload => {
  return dispatch => {
    dispatch(newOrderStart());

    const currentDate = new Date();
    const customerId = localStorage.getItem('IFOOD_udid');
    const subTotal = payload.order.reduce((sum, el) => sum + el.itemPrice, 0);

    const order = {
      idCustomer: customerId,
      idMerchant: payload.restaurant.id,
      createdAt: format(currentDate, 'HH:mm'),
      deliveryDateTime: format(
        add(currentDate, { minutes: payload.restaurant.eta }),
        'HH:mm',
      ),
      payment: {
        paymentName: payload.paymentMethod.value,
        value: subTotal + payload.restaurant.fee,
        paymentStatus: 'PENDENTE',
      },
      subTotal: subTotal,
      deliveryFee: payload.restaurant.fee,
      totalPrice: subTotal + payload.restaurant.fee,
      orderStatus: 'CRIADO',
      deliveryAddress: payload.address,
      items: payload.order.map(el => ({
        quantity: el.itemAmount,
        name: el.itemName,
        totalPrice: el.itemPrice,
        discount: 0.0,
        comment: '',
        subItens: el.subItems.map(subEl => ({
          name: subEl.subItemName,
          quantity: subEl.subItemAmount,
        })),
      })),
    };

    if (customerId) {
      axios
        .post(`/order/orders`, order)
        .then(res => {
          dispatch(
            newOrderSuccess({
              orderId: res.headers.location.split('orderRequests/')[1],
            }),
          );
        })
        .catch(err => {
          dispatch(newOrderFail({ error: err.response?.status || 500 }));
        });
    } else {
      dispatch(newOrderFail({ error: 401 }));
    }
  };
};

export const fetchOrderStart = () => ({
  type: actionTypes.FETCH_ORDER_START,
});

export const fetchOrderSuccess = payload => ({
  type: actionTypes.FETCH_ORDER_SUCCESS,
  payload,
});

export const fetchOrderFail = payload => ({
  type: actionTypes.FETCH_ORDER_FAIL,
  payload,
});

export const fetchOrder = payload => {
  return dispatch => {
    dispatch(fetchOrderStart());

    axios
      .get(`/order/orders/${payload.id}`)
      .then(res => {
        dispatch(fetchOrderSuccess({ order: res.data }));
      })
      .catch(err => {
        dispatch(fetchOrderFail({ error: err.response?.status || 500 }));
      });
  };
};

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrdersSuccess = payload => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  payload,
});

export const fetchOrdersFail = payload => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  payload,
});

export const fetchOrders = payload => {
  return dispatch => {
    dispatch(fetchOrdersStart());

    if (payload.type === 'customer') {
      const customerId = localStorage.getItem('IFOOD_udid');

      axios
        .get(`/order/orders?customerId=${customerId}`)
        .then(res => {
          dispatch(fetchOrdersSuccess({ orders: res.data.content }));
        })
        .catch(err => {
          dispatch(fetchOrdersFail({ error: err.response?.status || 500 }));
        });
    }
  };
};

export const orderEditStatusStart = () => ({
  type: actionTypes.ORDER_EDIT_STATUS_START,
});

export const orderEditStatusSuccess = payload => ({
  type: actionTypes.ORDER_EDIT_STATUS_SUCCESS,
  payload,
});

export const orderEditStatusFail = payload => ({
  type: actionTypes.ORDER_EDIT_STATUS_FAIL,
  payload,
});

export const orderEditStatus = payload => {
  return dispatch => {
    dispatch(orderEditStatusStart());

    axios
      .put(`/order/orders/${payload.orderId}/order-status`, {
        orderStatus: payload.status,
      })
      .then(res => {
        dispatch(orderEditStatusSuccess({ order: res.data }));
      })
      .catch(err => {
        dispatch(orderEditStatusFail({ error: err.response?.status || 500 }));
      });
  };
};

export const orderEditPaymentStart = () => ({
  type: actionTypes.ORDER_EDIT_PAYMENT_START,
});

export const orderEditPaymentSuccess = payload => ({
  type: actionTypes.ORDER_EDIT_PAYMENT_SUCCESS,
  payload,
});

export const orderEditPaymentFail = payload => ({
  type: actionTypes.ORDER_EDIT_PAYMENT_FAIL,
  payload,
});

export const orderEditPayment = payload => {
  return dispatch => {
    dispatch(orderEditPaymentStart());
    dispatch(orderEditStatus({ orderId: payload.orderId, status: 'RECEBIDO' }));

    axios
      .put(`/order/orders/${payload.orderId}/payment-status`, {
        paymentStatus: payload.status,
      })
      .then(res => {
        dispatch(orderEditPaymentSuccess({ order: res.data }));
      })
      .catch(err => {
        dispatch(orderEditPaymentFail({ error: err.response?.status || 500 }));
      });
  };
};

export const orderRateStart = () => ({
  type: actionTypes.ORDER_RATE_START,
});

export const orderRateSuccess = () => ({
  type: actionTypes.ORDER_RATE_SUCCESS,
});

export const orderRateFail = payload => ({
  type: actionTypes.ORDER_RATE_FAIL,
  payload,
});

export const orderRate = payload => {
  return dispatch => {
    dispatch(orderRateStart());

    axios
      .post(`/customer/customers/${payload.customerId}/rates`, {
        merchantId: payload.merchantId,
        rate: payload.rate,
      })
      .then(() => {
        dispatch(orderRateSuccess());
      })
      .catch(err => {
        dispatch(orderRateFail({ error: err.response?.status || 500 }));
      });
  };
};

export const resetOrder = () => ({
  type: actionTypes.RESET_ORDER,
});

export const resetOrders = () => ({
  type: actionTypes.RESET_ORDERS,
});

export const resetOrderId = () => ({
  type: actionTypes.RESET_ORDER_ID,
});
