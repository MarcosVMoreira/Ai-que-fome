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
        subItems: el.subItems.map(subEl => ({
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
              orderId: res.headers.location.split('orders/')[1],
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

export const resetOrder = () => ({
  type: actionTypes.RESET_ORDER,
});

export const resetOrders = () => ({
  type: actionTypes.RESET_ORDERS,
});

export const resetOrderId = () => ({
  type: actionTypes.RESET_ORDER_ID,
});
