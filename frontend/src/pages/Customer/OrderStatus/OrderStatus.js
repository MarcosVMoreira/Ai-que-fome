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
import React, { useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import classes from './OrderStatus.module.scss';

export const OrderStatus = withRouter(props => {
  /* Redux Selectors */
  // const error = useSelector(state => state.order.error);
  // const loading = useSelector(state => state.order.loading);
  // const order = useSelector(state => state.order.order);

  /* Redux Dispatchers */
  // const dispatch = useDispatch();
  // const onFetchOrder = useCallback(orderId => dispatch(actions.fetchOrder(orderId)), [dispatch]);
  // const onResetOrder = useCallback(() => dispatch(actions.resetOrder()), [dispatch]);

  /* Constants */
  const { id } = useParams();

  /* Functions */
  // Set order and restaurant data on page enter
  useEffect(
    () => {
      // if (id) {
      //   onFetchOrder({ id });
      // }
      // return () => {
      //   onResetOrder();
      // };
    },
    [
      /*onFetchOrder, onResetOrder, id*/
    ],
  );

  const handleOrderDetail = () => {
    props.history.push(`detail/${id}`);
  };

  // let errorBlock;
  // // If we get a 400 error, it means the user is trying to submit an incomplete form
  // error === 400 &&
  //   (errorBlock = (
  //     <div className={classes.card_subtitle}>
  //       Erro de de formulário, preencha todos os campos!
  //     </div>
  //   ));
  // // Authentication error
  // error === 401 &&
  //   (errorBlock = (
  //     <div className={classes.card_subtitle}>
  //       Erro de autenticação, faça login novamente!
  //     </div>
  //   ));
  // // Permission error
  // error === 403 &&
  //   (errorBlock = (
  //     <div className={classes.card_subtitle}>
  //       Erro de permissão, contate um administrador caso continue vendo este
  //       erro!
  //     </div>
  //   ));
  // // Customer error
  // error === 404 &&
  //   (errorBlock = (
  //     <div className={classes.card_subtitle}>
  //       Erro ao obter informações de usuário, tente novamente mais tarde
  //     </div>
  //   ));
  // // Processing error
  // error === 422 &&
  //   (errorBlock = (
  //     <div className={classes.card_subtitle}>
  //       Erro de processamento, por favor contate um administrador!
  //     </div>
  //   ));
  // // Server error
  // (error === 500 || error === 503 || error === 504) &&
  //   (errorBlock = (
  //     <div className={classes.card_subtitle}>
  //       Erro de servidor, por favor contate um administrador!
  //     </div>
  //   ));

  return (
    <div className={classes.container}>
      {/* {errorBlock} */}

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
            Box Brothers - Burger (e) Defumados
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
                  Hoje • 22:03 - 22:13
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
                  Realizado • 21:40
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
                  Confirmado • 21:40
                </Typography>

                <Typography>Ao confirmar, seu pedido será preparado</Typography>
              </TimelineContent>

              <TimelineSeparator>
                <TimelineDot color="primary">
                  <RadioButtonUnchecked />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
            </TimelineItem>

            <TimelineItem>
              <TimelineContent className={classes.container_status__item}>
                <Typography variant="h6" component="h1">
                  Pronto • 21:40
                </Typography>

                <Typography>
                  Entrega em: R. Antônio de Barros, 2650 - São Paulo/SP
                </Typography>
              </TimelineContent>

              <TimelineSeparator>
                <TimelineDot color="primary">
                  <RadioButtonUnchecked />
                </TimelineDot>
              </TimelineSeparator>
            </TimelineItem>
          </Timeline>
        </Grid>
      </Grid>
    </div>
  );
});
