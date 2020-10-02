import * as actionTypes from './actionTypes';
import axios from '../../Axios';

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
      name: payload.email,
      phone: payload.phone,
      document: payload.document,
      password: '12345',
    };

    axios
      .post('signup', signUpData)
      .then(() => {
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
