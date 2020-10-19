import * as actionTypes from './actionTypes';
import axios from '../../Axios';

export const customerAddressStart = () => ({
  type: actionTypes.CUSTOMER_ADDRESS_START,
});

export const customerAddressSuccess = payload => ({
  type: actionTypes.CUSTOMER_ADDRESS_SUCCESS,
  payload,
});

export const customerAddressFail = payload => ({
  type: actionTypes.CUSTOMER_ADDRESS_FAIL,
  payload,
});

export const customerAddress = () => {
  return dispatch => {
    dispatch(customerAddressStart());

    const customerMail = localStorage.getItem('IFOOD_email');

    if (customerMail) {
      axios
        .get(`/customer/customers/email/${customerMail}`)
        .then(res => {
          dispatch(customerAddressSuccess({ customer: res.data }));
        })
        .catch(err => {
          dispatch(customerAddressFail({ error: err.response.status }));
        });
    } else {
      dispatch(customerAddressFail);
    }
  };
};
