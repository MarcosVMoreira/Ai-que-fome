import { Button, Grid } from '@material-ui/core';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import empty_cart from '../../../assets/icons/empty_cart.svg';
import select from '../../../assets/icons/select.svg';
import { Spinner } from '../../../components/Shared/Spinner/Spinner';
import { orderStatus, payments } from '../../../helpers/enums';
import * as actions from '../../../store/actions/index';
import classes from './Home.module.scss';

export const Home = () => {
  /* State Hooks */
  const [selectedOrder, setSelectedOrder] = useState(null);

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
  const onOrderEditStatus = order => dispatch(actions.orderEditStatus(order));

  /* Functions */
  // Set orders and restaurants data on page enter
  useEffect(() => {
    onFetchOrders({ type: 'merchant' });

    return () => {
      onResetOrders();
    };
  }, [onFetchOrders, onResetOrders]);

  const handleOrderEditStatus = status => {
    onOrderEditStatus({ orderId: selectedOrder.id, status: status });
    setSelectedOrder(null);
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

      {loading || !orders ? (
        <Spinner />
      ) : (
        <Grid container className={classes.container_body}>
          <Grid
            item
            xs={4}
            container
            direction="column"
            className={classes.container_body__orders}
          >
            <div className={classes.container_body__ordersList}>
              {orders.map(order => (
                <section
                  key={order.id}
                  className={`${classes.container_body__order} ${
                    selectedOrder?.id === order.id
                      ? classes.container_body__orderSelected
                      : ''
                  }`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div>
                    <span>#{order.code.toString().padStart(4, '0')}</span>
                    <span>{order.createdAt.replace(':00', '')}</span>
                  </div>

                  <div>
                    <span>{order.customerName}</span>
                    <span>
                      Previsto {order.deliveryDateTime.replace(':00', '')}
                    </span>
                  </div>

                  <div>
                    <Button
                      variant="contained"
                      disableElevation
                      disableRipple
                      color={
                        order.orderStatus === 'RECEBIDO' ? 'primary' : 'default'
                      }
                      style={
                        order.orderStatus === 'CRIADO'
                          ? { backgroundColor: '#CED0CE' }
                          : order.orderStatus === 'CONFIRMADO'
                          ? { backgroundColor: '#2dd36f' }
                          : order.orderStatus === 'ENVIADO'
                          ? { backgroundColor: '#ffb400' }
                          : {}
                      }
                    >
                      {orderStatus[order.orderStatus]}
                    </Button>
                  </div>
                </section>
              ))}

              {orders.length === 0 && (
                <div className={classes.container_body__detailEmpty}>
                  <span>Nenhum pedido feito</span>

                  <img src={empty_cart} alt="no orders" />
                </div>
              )}
            </div>

            <div className={classes.container_body__ordersSummary}>
              <div>
                <span>Faturamento</span>
                <span>
                  R$
                  {orders
                    .reduce((val, order) => val + order.subTotal, 0)
                    .toFixed(2)
                    .replace('.', ',')}
                </span>
              </div>

              <div>
                <span>Pedidos</span>
                <span>{orders.length}</span>
              </div>
            </div>
          </Grid>

          <Grid item xs={8} container direction="column">
            {selectedOrder ? (
              <div className={classes.container_body__detail}>
                <section>
                  <div>
                    <span>Código do Pedido</span>
                    <span>
                      #{selectedOrder.code.toString().padStart(4, '0')}
                    </span>
                  </div>

                  <div>
                    <span>Pedido criado</span>
                    <span>{selectedOrder.createdAt.replace(':00', '')}</span>
                  </div>

                  <div>
                    <span>Previsão de entrega</span>
                    <span>
                      {selectedOrder.deliveryDateTime.replace(':00', '')}
                    </span>
                  </div>

                  <div>
                    <span>Endereço</span>
                    <span>
                      {selectedOrder.deliveryAddress.streetName},{' '}
                      {selectedOrder.deliveryAddress.streetNumber} -{' '}
                      {selectedOrder.deliveryAddress.neighborhood} -{' '}
                      {selectedOrder.deliveryAddress.city}/
                      {selectedOrder.deliveryAddress.district}
                    </span>
                  </div>

                  <div>
                    <span>Status do Pedido</span>
                    <Button
                      variant="contained"
                      disableElevation
                      disableRipple
                      color={
                        selectedOrder.orderStatus === 'RECEBIDO'
                          ? 'primary'
                          : 'default'
                      }
                      style={
                        selectedOrder.orderStatus === 'CRIADO'
                          ? { backgroundColor: '#CED0CE' }
                          : selectedOrder.orderStatus === 'CONFIRMADO'
                          ? { backgroundColor: '#2dd36f' }
                          : selectedOrder.orderStatus === 'ENVIADO'
                          ? { backgroundColor: '#ffb400' }
                          : {}
                      }
                    >
                      {orderStatus[selectedOrder.orderStatus]}
                    </Button>
                  </div>
                </section>

                <section>
                  <div>
                    <span>Qtd</span>
                    <span>Itens</span>
                    <span>Preço</span>
                  </div>

                  <Fragment>
                    {selectedOrder.items.map((item, index) => (
                      <Fragment key={index}>
                        <div className={classes.item}>
                          <span>{item.quantity}</span>
                          <span>{item.name}</span>
                          <span>
                            R${item.totalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        </div>

                        {item.subItens.map((subItem, subIndex) => (
                          <div className={classes.subItem} key={subIndex}>
                            <span>{subItem.quantity}</span>
                            <span>{subItem.name}</span>
                            <span>R$0,00</span>
                          </div>
                        ))}
                      </Fragment>
                    ))}
                  </Fragment>
                </section>

                <section>
                  <div>
                    <span>Forma de Pagamento</span>
                    <span>{payments[selectedOrder.payment.paymentName]}</span>
                  </div>

                  <div>
                    <div>
                      <span>SubTotal</span>
                      <span>
                        R${selectedOrder.subTotal.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <div>
                      <span>Taxa de Entrega</span>
                      <span>
                        R$
                        {selectedOrder.deliveryFee.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <div>
                      <span>Total</span>
                      <span>
                        R$
                        {selectedOrder.totalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </section>

                <section>
                  {selectedOrder.orderStatus === 'CRIADO' ? (
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      onClick={() => handleOrderEditStatus('CONFIRMADO')}
                    >
                      Confirmar Pedido
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      disabled={
                        selectedOrder.orderStatus === 'ENVIADO' ||
                        selectedOrder.orderStatus === 'RECEBIDO'
                      }
                      onClick={() => handleOrderEditStatus('ENVIADO')}
                    >
                      {selectedOrder.orderStatus === 'CONFIRMADO'
                        ? 'Enviar Pedido'
                        : 'Pedido Enviado'}
                    </Button>
                  )}
                </section>
              </div>
            ) : (
              <div className={classes.container_body__detailEmpty}>
                <span>Selecione um pedido para Gerenciar</span>

                <img src={select} alt="select an item" />
              </div>
            )}
          </Grid>
        </Grid>
      )}
    </div>
  );
};
