import { combineReducers } from 'redux';
import authReducer from './auth';
import customerReducer from './customer';
import locateReducer from './locate';
import merchantReducer from './merchant';
import signUpReducer from './signup';

export const rootReducer = combineReducers({
  auth: authReducer,
  signUp: signUpReducer,
  customer: customerReducer,
  locate: locateReducer,
  merchant: merchantReducer,
});
