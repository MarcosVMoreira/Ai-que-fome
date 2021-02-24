import { Button, Grid, Typography } from '@material-ui/core';
import { CheckCircleIcon } from '@material-ui/data-grid';
import { RadioButtonUnchecked, Schedule } from '@material-ui/icons';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@material-ui/lab';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { RateModal } from '../../../components/Customer/RateModal/RateModal';
import { Spinner } from '../../../components/Shared/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import classes from './OrderStatus.module.scss';

export const OrderStatus = withRouter(props => {
  /* React State Hooks */
  const [rateRestaurant, setRateRestaurant] = useState(false);

  /* Redux Selectors */
  const error = useSelector(state => state.order.error);
  const loading = useSelector(state => state.order.loading);
  const order = useSelector(state => state.order.order);
  const customer = useSelector(state => state.customer.customer);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchOrder = useCallback(
    orderId => dispatch(actions.fetchOrder(orderId)),
    [dispatch],
  );
  const onResetOrder = useCallback(() => dispatch(actions.resetOrder()), [
    dispatch,
  ]);
  const onOrderEditPayment = payment =>
    dispatch(actions.orderEditPayment(payment));
  const onOrderRate = rate => dispatch(actions.orderRate(rate));

  /* Constants */
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

  const handleOrderDetail = () => {
    props.history.push(`/customer/order/detail/${id}`);
  };

  // Set the order status to finished and payment status to paid
  const handleRate = () => {
    onOrderEditPayment({ status: 'FINALIZADO', orderId: id });

    // Opens Rate Modal if the user hasn't rated the restaurant yet
    if (
      !customer.merchantRates ||
      !customer.merchantRates.find(el => el.merchantId === order.idMerchant)
    ) {
      setRateRestaurant(true);
    }
  };

  // Rates the restaurant
  const handleCloseRateModal = rate => {
    if (rate) {
      onOrderRate({
        merchantId: order.idMerchant,
        customerId: order.idCustomer,
        rate: rate,
      });
    }

    setRateRestaurant(null);
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
        <Grid container>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
            item
            md={6}
            sm={12}
            xs={12}
            className={classes.container_restaurant}
          >
            <span className={classes.container_restaurant__title}>
              {order.merchantName}
            </span>

            <Button color="primary" onClick={handleOrderDetail}>
              Detalhes do Pedido
            </Button>
          </Grid>

          <Grid
            container
            direction="column"
            item
            md={6}
            sm={12}
            xs={12}
            className={classes.container_status}
          >
            <span className={classes.container_status__title}>
              Acompanhe seu pedido
            </span>

            <Timeline align="right">
              <TimelineItem>
                <TimelineContent className={classes.container_status__item}>
                  <Typography variant="h6" component="h1">
                    Entrega • {order.deliveryDateTime}
                  </Typography>

                  <Typography>Previsão de Entrega</Typography>
                </TimelineContent>

                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <Schedule />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
              </TimelineItem>

              <TimelineItem>
                <TimelineContent className={classes.container_status__item}>
                  <Typography variant="h6" component="h1">
                    Realizado • {order.createdAt}
                  </Typography>

                  <Typography>
                    Seu pedido está sendo confirmado com a loja
                  </Typography>
                </TimelineContent>

                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <CheckCircleIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
              </TimelineItem>

              <TimelineItem>
                <TimelineContent className={classes.container_status__item}>
                  <Typography variant="h6" component="h1">
                    Confirmado
                  </Typography>

                  <Typography>
                    Ao confirmar, seu pedido será preparado
                  </Typography>
                </TimelineContent>

                <TimelineSeparator>
                  {order.orderStatus === 'CRIADO' ? (
                    <TimelineDot color="primary">
                      <RadioButtonUnchecked />
                    </TimelineDot>
                  ) : (
                    <TimelineDot color="primary">
                      <CheckCircleIcon />
                    </TimelineDot>
                  )}
                  <TimelineConnector />
                </TimelineSeparator>
              </TimelineItem>

              <TimelineItem>
                <TimelineContent className={classes.container_status__item}>
                  <Typography variant="h6" component="h1">
                    Pronto
                  </Typography>

                  <Typography>
                    Entrega em: {order.deliveryAddress.streetName},{' '}
                    {order.deliveryAddress.streetNumber} -{' '}
                    {order.deliveryAddress.city}/
                    {order.deliveryAddress.district}
                  </Typography>
                </TimelineContent>

                <TimelineSeparator>
                  {order.orderStatus === 'ENVIADO' ||
                  order.orderStatus === 'RECEBIDO' ? (
                    <Fragment>
                      <TimelineDot color="primary">
                        <CheckCircleIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </Fragment>
                  ) : (
                    <TimelineDot color="primary">
                      <RadioButtonUnchecked />
                    </TimelineDot>
                  )}
                </TimelineSeparator>
              </TimelineItem>

              {(order.orderStatus === 'ENVIADO' ||
                order.orderStatus === 'RECEBIDO') && (
                <TimelineItem>
                  <TimelineContent className={classes.container_status__button}>
                    <Button
                      disabled={order.orderStatus === 'RECEBIDO'}
                      color="primary"
                      variant="contained"
                      size="large"
                      onClick={handleRate}
                    >
                      Recebi meu Pedido
                    </Button>
                  </TimelineContent>

                  <TimelineSeparator>
                    {order.orderStatus === 'RECEBIDO' ? (
                      <Fragment>
                        <TimelineDot color="primary">
                          <CheckCircleIcon />
                        </TimelineDot>
                      </Fragment>
                    ) : (
                      <TimelineDot color="primary">
                        <RadioButtonUnchecked />
                      </TimelineDot>
                    )}
                  </TimelineSeparator>
                </TimelineItem>
              )}
            </Timeline>
          </Grid>

          <RateModal
            open={Boolean(rateRestaurant)}
            close={handleCloseRateModal}
          />
        </Grid>
      )}
    </div>
  );
});
