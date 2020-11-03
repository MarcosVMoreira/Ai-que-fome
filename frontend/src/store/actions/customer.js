import * as actionTypes from './actionTypes';
import axios from '../../Axios';

export const viaCepStart = () => ({
  type: actionTypes.VIACEP_START,
});

export const viaCepSuccess = payload => ({
  type: actionTypes.VIACEP_SUCCESS,
  payload,
});

export const viaCepFail = payload => ({
  type: actionTypes.VIACEP_FAIL,
  payload,
});

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

export const customerNewAddress = address => {
  return dispatch => {
    dispatch(customerNewAddressStart());
    const userId = localStorage.getItem('IFOOD_udid');

    axios
      .get(`/customer/customers/${userId}/address/`)
      .then(() => {
        dispatch(customerNewAddressSuccess(address));
      })
      .catch(err => {
        dispatch(customerNewAddressFail({ error: err.response.status }));
      });
  };
};

export const viaCep = ({ district, city, streetName }) => {
  return dispatch => {
    dispatch(viaCepStart());

    fetch(`https://viacep.com.br/ws/${district}/${city}/${streetName}/json/`)
      .then(data => {
        data.json().then(res => {
          dispatch(viaCepSuccess({ postalCode: res[0].cep.replace('-', '') }));
        });
      })
      .catch(err => {
        dispatch(viaCepFail({ error: err }));
      });
  };
};
