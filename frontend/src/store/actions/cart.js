import * as actionTypes from './actionTypes';

export const addCartItem = payload => ({
  type: actionTypes.ADD_CART_ITEM,
  payload,
});

export const removeCartItem = payload => ({
  type: actionTypes.REMOVE_CART_ITEM,
  payload,
});

export const resetCart = () => ({
  type: actionTypes.RESET_CART,
});
