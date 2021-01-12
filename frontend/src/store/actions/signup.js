import axios from '../../Axios';
import { unmask } from '../../helpers/unmask';
import * as actionTypes from './actionTypes';

export const customerSignUpStart = () => ({
  type: actionTypes.CUSTOMER_SIGNUP_START,
});

export const customerSignUpSuccess = () => ({
  type: actionTypes.CUSTOMER_SIGNUP_SUCCESS,
});

export const customerSignUpFail = payload => ({
  type: actionTypes.CUSTOMER_SIGNUP_FAIL,
  payload,
});

export const customerSignUp = payload => {
  return dispatch => {
    dispatch(customerSignUpStart());

    const signUpData = {
      email: payload.email,
      name: payload.name,
      phone: unmask(payload.phone),
      taxPayerIdentificationNumber: unmask(payload.document),
    };

    axios
      .post('/customer/customers/', signUpData)
      .then(() => {
        dispatch(customerSignUpSuccess());
      })
      .catch(err => {
        dispatch(customerSignUpFail({ error: err.response?.status || 500 }));
      });
  };
};

export const merchantSignUpStart = () => ({
  type: actionTypes.MERCHANT_SIGNUP_START,
});

export const merchantSignUpSuccess = () => ({
  type: actionTypes.MERCHANT_SIGNUP_SUCCESS,
});

export const merchantSignUpFail = payload => ({
  type: actionTypes.MERCHANT_SIGNUP_FAIL,
  payload,
});

export const merchantSignUp = payload => {
  return dispatch => {
    dispatch(merchantSignUpStart());

    const signUpData = {
      ...payload,
      postalCode: unmask(payload.postalCode),
      phone: unmask(payload.phone),
      document: unmask(payload.document),
      businessStart: new Date(payload.businessStart).toLocaleTimeString(),
      businessEnd: new Date(payload.businessEnd).toLocaleTimeString(),
      country: 'BR',
      availability: true,
      rate: 5.0,
    };

    axios
      .post('/merchant/merchants/', signUpData)
      .then(() => {
        dispatch(merchantSignUpSuccess());
      })
      .catch(err => {
        dispatch(merchantSignUpFail({ error: err.response?.status || 500 }));
      });
  };
};

export const signUpReset = () => ({
  type: actionTypes.SIGNUP_RESET,
});
