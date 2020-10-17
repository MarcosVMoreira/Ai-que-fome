import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  success: false,
};

const signUpStart = state => ({
  ...state,
  error: null,
  success: false,
  loading: true,
});

const signUpSuccess = state => ({
  ...state,
  error: null,
  loading: false,
  success: true,
});

const signUpFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const signUpReset = () => ({
  ...initialState,
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SIGNUP_START:
      return signUpStart(state);
    case actionTypes.SIGNUP_SUCCESS:
      return signUpSuccess(state);
    case actionTypes.SIGNUP_FAIL:
      return signUpFail(state, payload);
    case actionTypes.SIGNUP_RESET:
      return signUpReset();
    default:
      return state;
  }
};

export default reducer;
