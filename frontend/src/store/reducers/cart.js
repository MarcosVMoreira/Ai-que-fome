import * as actionTypes from '../actions/actionTypes';

const initialState = {
  restaurant: null,
  cart: [],
};

const addCartItem = (state, payload) => ({
  restaurant: { name: payload.restaurant, fee: payload.restaurantFee },
  cart: [...state.cart, { ...payload }],
});

const removeCartItem = (state, payload) => {
  const cartCopy = [...state.cart];
  cartCopy.splice(payload, 1);

  return { ...state, cart: [...cartCopy] };
};

const resetCart = () => ({
  cart: [],
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_CART_ITEM:
      return addCartItem(state, payload);
    case actionTypes.REMOVE_CART_ITEM:
      return removeCartItem(state, payload);
    case actionTypes.RESET_CART:
      return resetCart();
    default:
      return state;
  }
};

export default reducer;
