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

    const merchantEmail = localStorage.getItem('IFOOD_email');

    if (merchantEmail) {
      axios
        .get(`/merchant/merchants/email/${merchantEmail}`)
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

export const merchantEditDataSuccess = payload => ({
  type: actionTypes.MERCHANT_EDIT_DATA_SUCCESS,
  payload,
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
      country: 'BR',
      availability: true,
    };

    axios
      .put(`/merchant/merchants/${merchantId}`, data)
      .then(res => {
        dispatch(merchantEditDataSuccess({ merchant: res.data }));
      })
      .catch(err => {
        dispatch(merchantEditDataFail({ error: err.response?.status || 500 }));
      });
  };
};

export const merchantPutCategoriesStart = () => ({
  type: actionTypes.MERCHANT_PUT_CATEGORIES_START,
});

export const merchantPutCategoriesSuccess = payload => ({
  type: actionTypes.MERCHANT_PUT_CATEGORIES_SUCCESS,
  payload,
});

export const merchantPutCategoriesFail = payload => ({
  type: actionTypes.MERCHANT_PUT_CATEGORIES_FAIL,
  payload,
});

export const merchantPutCategories = categories => {
  return dispatch => {
    dispatch(merchantPutCategoriesStart());
    const merchantId = localStorage.getItem('IFOOD_udid');
    const categoriesCopy = [...categories];
    const mappedCategories = categoriesCopy.map(category => ({
      availability: category.availability,
      name: category.name,
      skus: category.skus?.map(sku => ({
        availability: sku.availability,
        description: sku.description,
        name: sku.name,
        price: sku.price,
        image: sku.image,
        options: sku.options?.map(option => ({
          name: option.name,
          price: option.price,
          maxQuantity: option.maxQuantity,
          minQuantity: option.minQuantity,
        })),
      })),
    }));

    axios
      .put(`/merchant/merchants/${merchantId}/category`, mappedCategories)
      .then(res => {
        dispatch(merchantPutCategoriesSuccess({ merchant: res.data }));
      })
      .catch(err => {
        dispatch(
          merchantPutCategoriesFail({ error: err.response?.status || 500 }),
        );
      });
  };
};
