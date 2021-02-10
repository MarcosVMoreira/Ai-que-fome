import { Button, Divider, Grid } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import empty_cart from '../../../assets/icons/empty_cart.svg';
import * as actions from '../../../store/actions/index';
import classes from './Cart.module.scss';

export const Cart = withRouter(() => {
  /* Redux Selectors */
  const cart = useSelector(state => state.cart.cart);
  const restaurant = useSelector(state => state.cart.restaurant);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  // const onResetCart = () => dispatch(actions.resetCart());
  const onRemoveCartItem = cart => dispatch(actions.removeCartItem(cart));

  /* Functions */
  const handleRemove = index => {
    onRemoveCartItem(index);
  };

  return (
    <Fragment>
      {cart.length ? (
        <Grid
          container
          direction="column"
          align="flex-start"
          className={classes.cart}
          spacing={2}
        >
          <Grid item xs className={classes.cart_subtitle}>
            <span> Seu pedido em </span>
          </Grid>

          <Grid item xs className={classes.cart_title}>
            <span>{restaurant.name}</span>
          </Grid>

          <Divider light />

          {cart.map((el, index) => (
            <Fragment key={el.id}>
              <Grid item xs container direction="row" justify="space-between">
                <Grid item className={classes.cart_item__title}>
                  <span>
                    {el.itemAmount}x {el.itemName}
                  </span>
                </Grid>

                <Grid item className={classes.cart_price__title}>
                  <span>R${el.itemPrice.toFixed(2).replace('.', ',')}</span>
                </Grid>
              </Grid>

              <Grid item xs container direction="row" wrap="wrap">
                <span className={classes.cart_item__subtitle}>
                  {el.subItems
                    .map(
                      subEl => `${subEl.subItemAmount}x ${subEl.subItemName}`,
                    )
                    .join(', ')}
                </span>
              </Grid>

              <Grid item xs>
                <Button variant="outlined" onClick={() => handleRemove(index)}>
                  Remover
                </Button>
              </Grid>

              <Divider light />
            </Fragment>
          ))}

          <Grid
            item
            xs
            container
            direction="row"
            justify="space-between"
            className={classes.cart_price}
          >
            <Grid item>
              <span>Subtotal</span>
            </Grid>

            <Grid item>
              <span>
                R$
                {cart
                  .reduce((sum, el) => sum + el.itemPrice, 0)
                  .toFixed(2)
                  .replace('.', ',')}
              </span>
            </Grid>
          </Grid>

          <Grid
            item
            xs
            container
            direction="row"
            justify="space-between"
            className={classes.cart_price}
          >
            <Grid item>
              <span>Taxa de Entrega</span>
            </Grid>

            <Grid item>
              <span>R${restaurant.fee.toFixed(2).replace('.', ',')}</span>
            </Grid>
          </Grid>

          <Grid
            item
            xs
            container
            direction="row"
            justify="space-between"
            className={classes.cart_price}
          >
            <Grid item className={classes.cart_price__title}>
              <span>Total</span>
            </Grid>

            <Grid item className={classes.cart_price__title}>
              <span>
                R$
                {(
                  restaurant.fee +
                  cart.reduce((sum, el) => sum + el.itemPrice, 0)
                )
                  .toFixed(2)
                  .replace('.', ',')}
              </span>
            </Grid>
          </Grid>

          <Divider light />

          <Grid item xs>
            <Button
              variant="contained"
              color="primary"
              style={{ width: '100%' }}
            >
              Fazer Pedido
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          justify="center"
          align="center"
          className={classes.cart}
        >
          <img
            className={classes.cart_image}
            src={empty_cart}
            alt="empty cart logo"
          />
          <span className={classes.cart_empty}>Seu carrinho está vazio</span>
        </Grid>
      )}
    </Fragment>
  );
});
