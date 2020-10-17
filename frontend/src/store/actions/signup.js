import * as actionTypes from './actionTypes';
import axios from '../../Axios';

import { unmask } from '../../helpers/unmask';

export const signUpStart = () => ({
  type: actionTypes.SIGNUP_START,
});

export const signUpSuccess = () => ({
  type: actionTypes.SIGNUP_SUCCESS,
});

export const signUpFail = payload => ({
  type: actionTypes.SIGNUP_FAIL,
  payload,
});

export const signUp = payload => {
  return dispatch => {
    dispatch(signUpStart());

    const signUpData = {
      email: payload.email,
      name: payload.name,
      phone: unmask(payload.phone),
      taxPayerIdentificationNumber: unmask(payload.document),
    };

    axios
      .post('/customer/customers/', signUpData)
      .then(res => {
        console.log(res);
        dispatch(signUpSuccess());
      })
      .catch(err => {
        dispatch(signUpFail({ error: err.response.status }));
      });
  };
};

export const signUpReset = () => ({
  type: actionTypes.SIGNUP_RESET,
});
