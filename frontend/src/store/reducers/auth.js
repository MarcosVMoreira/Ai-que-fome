import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  error: null,
  loading: false,
};

const authEmailStart = state => ({ ...state, error: null, loading: true });

const authEmailSuccess = (state, payload) => ({
  ...state,
  error: null,
  loading: false,
  token: payload.accessToken,
});

const authEmailFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.AUTH_EMAIL_START:
      return authEmailStart(state);
    case actionTypes.AUTH_EMAIL_SUCCESS:
      return authEmailSuccess(state, payload);
    case actionTypes.AUTH_EMAIL_FAIL:
      return authEmailFail(state, payload);
    default:
      return state;
  }
};

export default reducer;
