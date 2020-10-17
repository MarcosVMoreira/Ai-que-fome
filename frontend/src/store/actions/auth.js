import * as actionTypes from './actionTypes';
import axios from '../../Axios';

export const authEmailStart = () => ({
  type: actionTypes.AUTH_EMAIL_START,
});

export const authEmailSuccess = () => ({
  type: actionTypes.AUTH_EMAIL_SUCCESS,
});

export const authEmailFail = payload => ({
  type: actionTypes.AUTH_EMAIL_FAIL,
  payload,
});

export const authEmail = payload => {
  return dispatch => {
    dispatch(authEmailStart());

    axios
      .get(`/auth/user/token/${payload.email}`)
      .then(() => {
        dispatch(authEmailSuccess());
      })
      .catch(err => {
        dispatch(
          authEmailFail({ error: err.response.status, email: payload.email }),
        );
      });
  };
};

export const authPasswordStart = () => ({
  type: actionTypes.AUTH_PASSWORD_START,
});

export const authPasswordSuccess = payload => ({
  type: actionTypes.AUTH_PASSWORD_SUCCESS,
  payload,
});

export const authPasswordFail = payload => ({
  type: actionTypes.AUTH_PASSWORD_FAIL,
  payload,
});

export const authPassword = payload => {
  return dispatch => {
    dispatch(authPasswordStart());

    const authData = {
      email: payload.email,
      loginCode: payload.password,
    };

    axios
      .post('/auth/login', authData)
      .then(res => {
        dispatch(authPasswordSuccess(res.data));
      })
      .catch(err => {
        dispatch(authPasswordFail({ error: err.response.status }));
      });
  };
};

export const authReset = () => ({
  type: actionTypes.AUTH_RESET,
});

export const errorReset = () => ({
  type: actionTypes.ERROR_RESET,
});
