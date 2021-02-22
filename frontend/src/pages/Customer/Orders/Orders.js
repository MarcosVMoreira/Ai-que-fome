import { Grid, Typography } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { OrderCard } from '../../../components/Customer/OrderCard/OrderCard';
import { Spinner } from '../../../components/Shared/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import classes from './Orders.module.scss';

export const Orders = withRouter(props => {
  /* Redux Selectors */
  const error = useSelector(state => state.order.error);
  const loading = useSelector(state => state.order.loading);
  const orders = useSelector(state => state.order.orders);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchOrders = useCallback(
    order => dispatch(actions.fetchOrders(order)),
    [dispatch],
  );
  const onResetOrders = useCallback(() => dispatch(actions.resetOrders()), [
    dispatch,
  ]);

  /* Functions */
  // Set orders and restaurants data on page enter
  useEffect(() => {
    onFetchOrders({ type: 'customer' });

    return () => {
      onResetOrders();
    };
  }, [onFetchOrders, onResetOrders]);

  const handleOrderDetail = id => {
    props.history.push(`/customer/order/detail/${id}`);
  };

  let errorBlock;
  // If we get a 400 error, it means the user is trying to submit an incomplete form
  error === 400 &&
    (errorBlock = (
      <div className={classes.card_subtitle}>
        Erro de de formulário, preencha todos os campos!
      </div>
    ));
  // Authentication error
  error === 401 &&
    (errorBlock = (
      <div className={classes.card_subtitle}>
        Erro de autenticação, faça login novamente!
      </div>
    ));
  // Permission error
  error === 403 &&
    (errorBlock = (
      <div className={classes.card_subtitle}>
        Erro de permissão, contate um administrador caso continue vendo este
        erro!
      </div>
    ));
  // Customer error
  error === 404 &&
    (errorBlock = (
      <div className={classes.card_subtitle}>
        Erro ao obter informações de usuário, tente novamente mais tarde
      </div>
    ));
  // Processing error
  error === 422 &&
    (errorBlock = (
      <div className={classes.card_subtitle}>
        Erro de processamento, por favor contate um administrador!
      </div>
    ));
  // Server error
  (error === 500 || error === 503 || error === 504) &&
    (errorBlock = (
      <div className={classes.card_subtitle}>
        Erro de servidor, por favor contate um administrador!
      </div>
    ));

  return (
    <div className={classes.container}>
      {errorBlock}

      {!orders || loading ? (
        <Spinner />
      ) : (
        <Grid container direction="column">
          <Typography variant="h5" component="h1">
            Pedidos
          </Typography>

          <Grid container item>
            {orders.map(order => (
              <Grid item xs={12} sm={12} md={6} key={order.id}>
                <OrderCard
                  {...order}
                  onClick={() => handleOrderDetail(order.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </div>
  );
});
