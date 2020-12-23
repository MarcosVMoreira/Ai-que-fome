import axios from '../../Axios';
import * as actionTypes from './actionTypes';

export const merchantDataStart = () => ({
  type: actionTypes.MERCHANT_DATA_START,
});

export const merchantDataSuccess = payload => ({
  type: actionTypes.MERCHANT_DATA_SUCCESS,
  payload,
});

export const merchantDataFail = payload => ({
  type: actionTypes.MERCHANT_DATA_FAIL,
  payload,
});

export const merchantData = () => {
  return dispatch => {
    dispatch(merchantDataStart());

    const merchantId = localStorage.getItem('IFOOD_udid');

    if (merchantId) {
      axios
        .get(`/merchant/merchants/${merchantId}`)
        .then(res => {
          dispatch(merchantDataSuccess({ merchant: res.data }));
        })
        .catch(err => {
          dispatch(merchantDataFail({ error: err.response?.status || 500 }));
        });
    } else {
      dispatch(merchantDataFail({ error: 401 }));
    }
  };
};
