import { combineReducers } from 'redux';
import authReducer from './auth';
import customerReducer from './customer';
import signUpReducer from './signup';

export const rootReducer = combineReducers({
  auth: authReducer,
  signUp: signUpReducer,
  customer: customerReducer,
});
