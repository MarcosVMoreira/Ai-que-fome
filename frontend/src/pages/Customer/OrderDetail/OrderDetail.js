import { Button, Divider, Grid, Typography } from '@material-ui/core';
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from '@material-ui/icons';
import React, { Fragment, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { Spinner } from '../../../components/Shared/Spinner/Spinner';
import { orderStatus } from '../../../helpers/enums';
import * as actions from '../../../store/actions/index';
import classes from './OrderDetail.module.scss';

export const OrderDetail = withRouter(props => {
  /* Redux Selectors */
  const error = useSelector(state => state.order.error);
  const loading = useSelector(state => state.order.loading);
  const order = useSelector(state => state.order.order);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchOrder = useCallback(
    orderId => dispatch(actions.fetchOrder(orderId)),
    [dispatch],
  );
  const onResetOrder = useCallback(() => dispatch(actions.resetOrder()), [
    dispatch,
  ]);

  const { id } = useParams();

  /* Functions */
  // Set order and restaurant data on page enter
  useEffect(() => {
    if (id) {
      onFetchOrder({ id });
    }
    return () => {
      onResetOrder();
    };
  }, [onFetchOrder, onResetOrder, id]);

  const handleBack = () => {
    props.history.push(`/customer/orders`);
  };

  const handleOrderStatus = () => {
    props.history.push(`/customer/order/status/${id}`);
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

      {!order || loading ? (
        <Spinner />
      ) : (
        <Grid container direction="column" spacing={2}>
          <Grid container justify="space-between">
            <Button
              size="small"
              startIcon={<ArrowBackIosRounded />}
              onClick={handleBack}
            >
              Voltar
            </Button>

            <Button
              color="primary"
              size="small"
              endIcon={<ArrowForwardIosRounded />}
              onClick={handleOrderStatus}
            >
              Acompanhar Pedido
            </Button>
          </Grid>

          <Grid item>
            <Typography variant="h4" component="h1">
              {order.merchantName}
            </Typography>
          </Grid>

          <Grid item>
            <Typography style={{ color: '#939393' }}>
              Previsão de Entrega:
            </Typography>

            <Typography style={{ color: '#333' }}>
              {order.deliveryDateTime}
            </Typography>
          </Grid>

          <Divider light />

          <Grid item>
            {order.items.map((item, index) => (
              <Fragment key={index}>
                <div style={{ margin: '10px 0 20px' }}>
                  <Grid container justify="space-between">
                    <Typography variant="h6" component="h1">
                      {item.quantity}x {item.name}
                    </Typography>

                    <Typography variant="h6" component="h1">
                      R${item.totalPrice.toFixed(2).replace('.', ',')}
                    </Typography>
                  </Grid>

                  <Typography
                    style={{
                      color: '#333',
                      margin: '0 10px',
                      lineHeight: 1.5,
                      textAlign: 'justify',
                    }}
                  >
                    {item.subItens
                      .map(subItem => `${subItem.quantity}x ${subItem.name}`)
                      .join(', ')}
                  </Typography>
                </div>

                <Divider light />
              </Fragment>
            ))}
          </Grid>

          <Grid item>
            <Grid container justify="space-between">
              <Typography variant="h6" component="h1">
                SubTotal
              </Typography>

              <Typography variant="h6" component="h1">
                R${order.subTotal.toFixed(2).replace('.', ',')}
              </Typography>
            </Grid>

            <Grid container justify="space-between">
              <Typography variant="body1" component="h3">
                Taxa de Entrega
              </Typography>

              <Typography variant="body1" component="h3">
                R${order.deliveryFee.toFixed(2).replace('.', ',')}
              </Typography>
            </Grid>

            <Grid container justify="space-between">
              <Typography variant="h6" component="h1">
                Total
              </Typography>

              <Typography variant="h6" component="h1">
                R${order.totalPrice.toFixed(2).replace('.', ',')}
              </Typography>
            </Grid>
          </Grid>

          <Divider light />

          <Grid item>
            <Typography style={{ color: '#939393' }}>Entrega em</Typography>

            <Typography style={{ color: '#333' }}>
              {order.deliveryAddress.streetName},{' '}
              {order.deliveryAddress.streetNumber} -{' '}
              {order.deliveryAddress.neighborhood} -{' '}
              {order.deliveryAddress.city}/{order.deliveryAddress.district}
            </Typography>
          </Grid>

          <Divider light />

          <Grid item>
            <Typography style={{ color: '#939393' }}>
              Número do Pedido
            </Typography>

            <Typography style={{ color: '#333' }}>
              {String(order.code).padStart(8, '0')}
            </Typography>
          </Grid>

          <Divider light />

          <Grid item>
            <Typography style={{ color: '#939393' }}>Pedido criado</Typography>

            <Typography style={{ color: '#333' }}>{order.createdAt}</Typography>
          </Grid>

          <Divider light />

          <Grid item>
            <Typography style={{ color: '#939393' }}>
              Status do Pedido
            </Typography>

            <Typography style={{ color: '#333' }}>
              {orderStatus[order.orderStatus]}
            </Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
});
