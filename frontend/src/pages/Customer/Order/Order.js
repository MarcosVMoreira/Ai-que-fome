import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Tab,
  Tabs,
} from '@material-ui/core';
import { RoomTwoTone } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import alelo from '../../../assets/icons/alelo.png';
import dinheiro from '../../../assets/icons/dinheiro.png';
import master from '../../../assets/icons/master.png';
import sodexo from '../../../assets/icons/sodexo.png';
import visa from '../../../assets/icons/visa.png';
import vr from '../../../assets/icons/vr.png';
import { Cart } from '../../../components/Customer/Cart/Cart';
import classes from './Order.module.scss';

export const Order = withRouter(() => {
  /* Redux Selectors */
  const cart = useSelector(state => state.cart.cart);
  const cartRestaurant = useSelector(state => state.cart.restaurant);
  // const error = useSelector(state => state.order.error);
  // const loading = useSelector(state => state.order.loading);

  /* Redux Dispatchers */
  // const dispatch = useDispatch();
  // const onCustomerData = useCallback(() => dispatch(actions.customerData()), [
  //   dispatch,
  // ]);
  // const onCustomerEditData = customer =>
  //   dispatch(actions.customerEditData(customer));

  /* React State Hooks */
  const [order, setOrder] = useState({
    address: '',
    order: '',
    restaurant: '',
    paymentMethod: '',
  });

  /* Constants */
  const paymentMethods = [
    {
      icon: dinheiro,
      value: 'DINHEIRO',
      label: 'Dinheiro',
      id: 0,
    },
    {
      icon: sodexo,
      value: 'VA',
      label: 'Sodexo Alimentação',
      id: 1,
    },
    {
      icon: sodexo,
      value: 'VR',
      label: 'Sodexo Refeição',
      id: 2,
    },
    {
      icon: vr,
      value: 'VA',
      label: 'VR Alimentação',
      id: 3,
    },
    {
      icon: vr,
      value: 'VR',
      label: 'VR Refeição',
      id: 4,
    },
    {
      icon: alelo,
      value: 'VA',
      label: 'Alelo Alimentação',
      id: 5,
    },
    {
      icon: alelo,
      value: 'VR',
      label: 'Alelo Refeição',
      id: 6,
    },
    {
      icon: visa,
      value: 'CARTAO_CREDITO',
      label: 'Visa - Crédito',
      id: 7,
    },
    {
      icon: visa,
      value: 'CARTAO_DEBITO',
      label: 'Visa - Débito',
      id: 8,
    },
    {
      icon: master,
      value: 'CARTAO_CREDITO',
      label: 'Master - Crédito',
      id: 9,
    },
    {
      icon: master,
      value: 'CARTAO_DEBITO',
      label: 'Master - Débito',
      id: 10,
    },
  ];

  /* Functions */
  // Loads customer Data on page enter
  useEffect(() => {
    const order = JSON.parse(localStorage.getItem('IFOOD_cart'));
    const address = JSON.parse(localStorage.getItem('IFOOD_address'));

    if (order && address) {
      setOrder({
        paymentMethod: '',
        order: order.cart,
        address: address,
        restaurant: order.restaurant,
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'IFOOD_cart',
      JSON.stringify({ cart: cart, restaurant: cartRestaurant }),
    );
  }, [cart, cartRestaurant]);

  // Changes each field state value when user types
  const handleChange = payment => {
    setOrder({
      ...order,
      paymentMethod: { value: payment.value, id: payment.id },
    });
  };

  // On submit we first check if there are any invalid fields, if any we show the
  // invalid fields with their respective errors, otherwise we proceed to edit the user information
  const handleSubmit = () => {
    if (order.paymentMethod) {
      console.log(order);
    }
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

      <Grid
        container
        justify="space-between"
        alignItems="flex-start"
        className={classes.container_body}
      >
        <span className={classes.container_title}>Finalize seu pedido</span>

        <Divider light className={classes.container_divider} />

        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justify="flex-start"
          item
          md={5}
          sm={12}
        >
          <Tabs value={0} indicatorColor="primary" textColor="primary">
            <Tab label="Entrega" />
          </Tabs>

          <div className={classes.container_item}>
            <Avatar
              variant="rounded"
              className={classes.container_item__avatar}
            >
              <RoomTwoTone />
            </Avatar>

            <div className={classes.container_item__info}>
              <span className={classes.container_item__title}>
                {order.address.streetName}, {order.address.streetNumber}
              </span>

              <span className={classes.container_item__subtitle}>
                {order.address.city}/{order.address.district}
              </span>
            </div>
          </div>

          <Divider light className={classes.container_divider} />

          <Tabs value={0} indicatorColor="primary" textColor="primary">
            <Tab label="Pagamento" />
          </Tabs>

          {cartRestaurant && (
            <div className={classes.container_payments}>
              {paymentMethods
                .filter(el => cartRestaurant.payments.includes(el.value))
                .map(el => (
                  <div
                    className={`${classes.container_payment} ${
                      order.paymentMethod.id === el.id
                        ? classes.container_payment__selected
                        : ''
                    }`}
                    key={el.id}
                    onClick={() => handleChange(el)}
                  >
                    <img
                      src={el.icon}
                      alt="icone do meio de pagamento"
                      className={classes.container_payment__avatar}
                    />

                    <span className={classes.container_payment__info}>
                      {el.label}
                    </span>
                  </div>
                ))}
            </div>
          )}

          <Divider light className={classes.container_divider} />
        </Grid>

        <Grid item md={5} sm={12}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container justify="center" item sm={12}>
                <Cart />
              </Grid>
            </CardContent>
          </Card>

          <Divider light className={classes.container_divider} />
        </Grid>

        <Grid item md={5} sm={12}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            style={{ width: '100%' }}
            onClick={handleSubmit}
          >
            Fazer Pedido
          </Button>
        </Grid>
      </Grid>
    </div>
  );
});
