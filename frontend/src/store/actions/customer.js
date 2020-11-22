import * as actionTypes from './actionTypes';
import axios from '../../Axios';
import { unmask } from '../../helpers/unmask';

export const customerAddressStart = () => ({
  type: actionTypes.CUSTOMER_ADDRESS_START,
});

export const customerAddressSuccess = payload => ({
  type: actionTypes.CUSTOMER_ADDRESS_SUCCESS,
  payload,
});

export const customerAddressFail = payload => ({
  type: actionTypes.CUSTOMER_ADDRESS_FAIL,
  payload,
});

export const customerAddress = () => {
  return dispatch => {
    dispatch(customerAddressStart());

    const customerMail = localStorage.getItem('IFOOD_email');

    if (customerMail) {
      axios
        .get(`/customer/customers/email/${customerMail}`)
        .then(res => {
          dispatch(customerAddressSuccess({ customer: res.data }));
        })
        .catch(err => {
          dispatch(customerAddressFail({ error: err.response.status }));
        });
    } else {
      dispatch(customerAddressFail);
    }
  };
};

export const customerNewAddressStart = () => ({
  type: actionTypes.CUSTOMER_NEW_ADDRESS_START,
});

export const customerNewAddressSuccess = () => ({
  type: actionTypes.CUSTOMER_NEW_ADDRESS_SUCCESS,
});

export const customerNewAddressFail = payload => ({
  type: actionTypes.CUSTOMER_NEW_ADDRESS_FAIL,
  payload,
});

export const customerNewAddress = address => {
  return dispatch => {
    dispatch(customerNewAddressStart());
    const userId = localStorage.getItem('IFOOD_udid');

    const newAddress = {
      ...address,
      streetName: address.streetName ? address.streetName : 'Rua',
      streetNumber: address.streetNumber ? address.streetNumber : 0,
      district: address.district ? address.district : 'Estado',
      city: address.city ? address.city : 'Cidade',
      neighborhood: address.neighborhood ? address.neighborhood : 'Bairro',
      country: address.country ? address.country : 'País',
      postalCode: unmask(address.postalCode),
      complement: address.complement ? address.complement : null,
      refPoint: address.refPoint ? address.refPoint : null,
    };

    axios
      .post(`/customer/customers/${userId}/address/`, newAddress)
      .then(res => {
        console.log(res.headers);

        dispatch(customerNewAddressSuccess());
        dispatch(customerAddress());
      })
      .catch(err => {
        dispatch(customerNewAddressFail({ error: err.response.status }));
      });
  };
};

export const customerEditAddressStart = () => ({
  type: actionTypes.CUSTOMER_EDIT_ADDRESS_START,
});

export const customerEditAddressSuccess = () => ({
  type: actionTypes.CUSTOMER_EDIT_ADDRESS_SUCCESS,
});

export const customerEditAddressFail = payload => ({
  type: actionTypes.CUSTOMER_EDIT_ADDRESS_FAIL,
  payload,
});

export const customerEditAddress = (address, addressId) => {
  return dispatch => {
    dispatch(customerEditAddressStart());
    const userId = localStorage.getItem('IFOOD_udid');

    const editAddress = {
      ...address,
      streetName: address.streetName ? address.streetName : 'Rua',
      streetNumber: address.streetNumber ? address.streetNumber : 0,
      district: address.district ? address.district : 'Estado',
      city: address.city ? address.city : 'Cidade',
      neighborhood: address.neighborhood ? address.neighborhood : 'Bairro',
      country: address.country ? address.country : 'País',
      postalCode: unmask(address.postalCode),
      complement: address.complement ? address.complement : null,
      refPoint: address.refPoint ? address.refPoint : null,
    };

    axios
      .put(`/customer/customers/${userId}/address/${addressId}`, editAddress)
      .then(() => {
        dispatch(customerEditAddressSuccess());
        dispatch(customerAddress());
      })
      .catch(err => {
        dispatch(customerEditAddressFail({ error: err.response.status }));
      });
  };
};

export const customerRemoveAddressStart = () => ({
  type: actionTypes.CUSTOMER_REMOVE_ADDRESS_START,
});

export const customerRemoveAddressSuccess = () => ({
  type: actionTypes.CUSTOMER_REMOVE_ADDRESS_SUCCESS,
});

export const customerRemoveAddressFail = payload => ({
  type: actionTypes.CUSTOMER_REMOVE_ADDRESS_FAIL,
  payload,
});

export const customerRemoveAddress = addressId => {
  return dispatch => {
    dispatch(customerRemoveAddressStart());
    const userId = localStorage.getItem('IFOOD_udid');

    console.log(userId, addressId);

    axios
      .delete(`/customer/customers/${userId}/address/${addressId}`)
      .then(() => {
        dispatch(customerRemoveAddressSuccess());
        dispatch(customerAddress());
      })
      .catch(err => {
        dispatch(customerRemoveAddressFail({ error: err.response.status }));
      });
  };
};
