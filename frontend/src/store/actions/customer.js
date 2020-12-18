import axios from '../../Axios';
import { unmask } from '../../helpers/unmask';
import * as actionTypes from './actionTypes';

export const customerDataStart = () => ({
  type: actionTypes.CUSTOMER_DATA_START,
});

export const customerDataSuccess = payload => ({
  type: actionTypes.CUSTOMER_DATA_SUCCESS,
  payload,
});

export const customerDataFail = payload => ({
  type: actionTypes.CUSTOMER_DATA_FAIL,
  payload,
});

export const customerData = () => {
  return dispatch => {
    dispatch(customerDataStart());

    const customerId = localStorage.getItem('IFOOD_udid');

    if (customerId) {
      axios
        .get(`/customer/customers/${customerId}`)
        .then(res => {
          dispatch(customerDataSuccess({ customer: res.data }));
        })
        .catch(err => {
          dispatch(customerDataFail({ error: err.response?.status || 500 }));
        });
    } else {
      dispatch(customerDataFail({ error: 401 }));
    }
  };
};

export const customerEditDataStart = () => ({
  type: actionTypes.CUSTOMER_EDIT_DATA_START,
});

export const customerEditDataSuccess = () => ({
  type: actionTypes.CUSTOMER_EDIT_DATA_SUCCESS,
});

export const customerEditDataFail = payload => ({
  type: actionTypes.CUSTOMER_EDIT_DATA_FAIL,
  payload,
});

export const customerEditData = customer => {
  return dispatch => {
    dispatch(customerEditDataStart());
    const customerId = localStorage.getItem('IFOOD_udid');

    const data = {
      name: customer.name,
      phone: unmask(customer.phone),
      email: customer.email,
      taxPayerIdentificationNumber: unmask(customer.document),
      addresses: customer.addresses,
    };

    axios
      .put(`/customer/customers/${customerId}`, data)
      .then(() => {
        dispatch(customerEditDataSuccess());
        dispatch(customerData());
      })
      .catch(err => {
        dispatch(customerEditDataFail({ error: err.response?.status || 500 }));
      });
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
    const customerId = localStorage.getItem('IFOOD_udid');

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
      .post(`/customer/customers/${customerId}/address/`, newAddress)
      .then(() => {
        dispatch(customerNewAddressSuccess());
        dispatch(customerData());
      })
      .catch(err => {
        dispatch(
          customerNewAddressFail({ error: err.response?.status || 500 }),
        );
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
        dispatch(customerData());
      })
      .catch(err => {
        dispatch(
          customerEditAddressFail({ error: err.response?.status || 500 }),
        );
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

    axios
      .delete(`/customer/customers/${userId}/address/${addressId}`)
      .then(() => {
        dispatch(customerRemoveAddressSuccess());
        dispatch(customerData());
      })
      .catch(err => {
        dispatch(
          customerRemoveAddressFail({ error: err.response?.status || 500 }),
        );
      });
  };
};
