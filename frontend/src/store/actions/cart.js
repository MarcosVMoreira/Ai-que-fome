import * as actionTypes from './actionTypes';

export const setCart = payload => ({
  type: actionTypes.SET_CART,
  payload,
});

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

export const cartCheckState = () => {
  return dispatch => {
    const storedCart = JSON.parse(localStorage.getItem('IFOOD_cart'));

    if (storedCart) {
      dispatch(
        setCart({ cart: storedCart.cart, restaurant: storedCart.restaurant }),
      );
    }
  };
};
