import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  success: false,
};

const customerSignUpStart = state => ({
  ...state,
  error: null,
  success: false,
  loading: true,
});

const customerSignUpSuccess = state => ({
  ...state,
  error: null,
  loading: false,
  success: true,
});

const customerSignUpFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const merchantSignUpStart = state => ({
  ...state,
  error: null,
  success: false,
  loading: true,
});

const merchantSignUpSuccess = state => ({
  ...state,
  error: null,
  loading: false,
  success: true,
});

const merchantSignUpFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const signUpReset = () => ({
  ...initialState,
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.CUSTOMER_SIGNUP_START:
      return customerSignUpStart(state);
    case actionTypes.CUSTOMER_SIGNUP_SUCCESS:
      return customerSignUpSuccess(state);
    case actionTypes.CUSTOMER_SIGNUP_FAIL:
      return customerSignUpFail(state, payload);
    case actionTypes.MERCHANT_SIGNUP_START:
      return merchantSignUpStart(state);
    case actionTypes.MERCHANT_SIGNUP_SUCCESS:
      return merchantSignUpSuccess(state);
    case actionTypes.MERCHANT_SIGNUP_FAIL:
      return merchantSignUpFail(state, payload);
    case actionTypes.SIGNUP_RESET:
      return signUpReset();
    default:
      return state;
  }
};

export default reducer;
