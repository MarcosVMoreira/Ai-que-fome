import { Button, Divider, Grid, Typography } from '@material-ui/core';
import { ArrowBackIosRounded } from '@material-ui/icons';
import React, { Fragment, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { Spinner } from '../../../components/Shared/Spinner/Spinner';
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

  const handleOrderStatus = () => {
    props.history.push(`status/${id}`);
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
        <Grid container direction="column" spacing={1}>
          <Grid item xs={2}>
            <Button size="small" startIcon={<ArrowBackIosRounded />}>
              Voltar
            </Button>
          </Grid>

          <Grid item>
            <Typography variant="h4" component="h1">
              {order.merchantName}
            </Typography>
          </Grid>

          <Grid item>
            <Typography>
              Previsão de Entrega: {order.deliveryDateTime}
            </Typography>
          </Grid>

          <Divider light />

          <Grid item>
            {order.items.map((item, index) => (
              <Fragment key={index}>
                <Grid container justify="space-between">
                  <Typography variant="h6" component="h1">
                    {item.quantity}x {item.name}
                  </Typography>

                  <Typography variant="h6" component="h1">
                    R${item.totalPrice.toFixed(2).replace('.', ',')}
                  </Typography>
                </Grid>

                <Typography>1x 30CM, 2x 15CM</Typography>
              </Fragment>
            ))}
          </Grid>
        </Grid>
      )}
    </div>
  );
});
