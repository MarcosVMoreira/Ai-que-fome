import axios from '../../Axios';
import { unmask } from '../../helpers/unmask';
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

export const merchantEditDataStart = () => ({
  type: actionTypes.MERCHANT_EDIT_DATA_START,
});

export const merchantEditDataSuccess = () => ({
  type: actionTypes.MERCHANT_EDIT_DATA_SUCCESS,
});

export const merchantEditDataFail = payload => ({
  type: actionTypes.MERCHANT_EDIT_DATA_FAIL,
  payload,
});

export const merchantEditData = merchant => {
  return dispatch => {
    dispatch(merchantEditDataStart());
    const merchantId = localStorage.getItem('IFOOD_udid');

    const data = {
      ...merchant,
      postalCode: unmask(merchant.postalCode),
      phone: unmask(merchant.phone),
      document: unmask(merchant.document),
      businessStart: new Date(merchant.businessStart).toLocaleTimeString(),
      businessEnd: new Date(merchant.businessEnd).toLocaleTimeString(),
      merchantType: merchant.categories,
      country: 'BR',
      availability: true,
      rate: 5.0,
    };

    delete data.categories;

    axios
      .put(`/merchant/merchants/${merchantId}`, data)
      .then(() => {
        dispatch(merchantEditDataSuccess());
        dispatch(merchantData());
      })
      .catch(err => {
        dispatch(merchantEditDataFail({ error: err.response?.status || 500 }));
      });
  };
};
