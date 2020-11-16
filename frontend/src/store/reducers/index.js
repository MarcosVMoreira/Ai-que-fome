import { combineReducers } from 'redux';
import authReducer from './auth';
import signUpReducer from './signup';
import customerReducer from './customer';

export const rootReducer = combineReducers({
  auth: authReducer,
  signUp: signUpReducer,
  customer: customerReducer,
});
