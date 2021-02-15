import * as actionTypes from '../actions/actionTypes';

const initialState = {
  restaurant: null,
  cart: [],
};

const addCartItem = (state, payload) => ({
  restaurant: {
    id: payload.restaurant.id,
    name: payload.restaurant.restaurant,
    fee: payload.restaurant.fee,
    payments: payload.restaurant.payments,
  },
  cart: [...state.cart, { ...payload.cart }],
});

const removeCartItem = (state, payload) => {
  const cartCopy = [...state.cart];
  cartCopy.splice(payload, 1);

  if (cartCopy.length) {
    return { ...state, cart: [...cartCopy] };
  } else {
    return initialState;
  }
};

const setCart = (state, payload) => ({
  restaurant: payload.restaurant,
  cart: [...payload.cart],
});

const resetCart = () => ({
  restaurant: null,
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
    case actionTypes.SET_CART:
      return setCart(state, payload);
    default:
      return state;
  }
};

export default reducer;
