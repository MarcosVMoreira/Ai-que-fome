import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  token: null,
  registered: false,
  authenticated: false,
  signUpMail: null,
};

const authEmailStart = state => ({
  ...state,
  loading: true,
});

const authEmailSuccess = state => ({
  ...state,
  error: null,
  loading: false,
  registered: true,
});

const authEmailFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
  signUpMail: payload.email,
});

const authPasswordStart = state => ({
  ...state,
  loading: true,
});

const authPasswordSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  token: payload.accessToken,
  authenticated: true,
});

const authPasswordFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const authReset = () => ({
  ...initialState,
});

const errorReset = state => ({
  ...state,
  error: null,
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.AUTH_EMAIL_START:
      return authEmailStart(state);
    case actionTypes.AUTH_EMAIL_SUCCESS:
      return authEmailSuccess(state);
    case actionTypes.AUTH_EMAIL_FAIL:
      return authEmailFail(state, payload);
    case actionTypes.AUTH_PASSWORD_START:
      return authPasswordStart(state);
    case actionTypes.AUTH_PASSWORD_SUCCESS:
      return authPasswordSuccess(state, payload);
    case actionTypes.AUTH_PASSWORD_FAIL:
      return authPasswordFail(state, payload);
    case actionTypes.AUTH_RESET:
      return authReset();
    case actionTypes.ERROR_RESET:
      return errorReset(state);
    default:
      return state;
  }
};

export default reducer;
