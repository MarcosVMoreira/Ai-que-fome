import { AppBar, Chip, Grid, Toolbar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Spinner } from '../../Shared/Spinner/Spinner';
import classes from './Navbar.module.scss';

export const Navbar = () => {
  /* Redux Selectors */
  const merchant = useSelector(state => state.merchant.merchant) || [];
  const error = useSelector(state => state.merchant.error);
  const loading = useSelector(state => state.merchant.loading);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onMerchantData = useCallback(() => dispatch(actions.merchantData()), [
    dispatch,
  ]);

  /* Functions */
  // Loads merchant data each time the page is loaded
  useEffect(() => {
    onMerchantData();
  }, [onMerchantData]);

  let errorBlock;
  // Authentication error
  error === 401 &&
    (errorBlock = (
      <div className={classes.error}>
        Erro de autenticação, faça login novamente!
      </div>
    ));
  // Permission error
  error === 403 &&
    (errorBlock = (
      <div className={classes.error}>
        Erro de permissão, contate um administrador caso continue vendo este
        erro!
      </div>
    ));
  // Merchant error
  error === 404 &&
    (errorBlock = (
      <div className={classes.error}>
        Erro ao obter os dados do restaurante, tente novamente mais tarde
      </div>
    ));
  // Processing error
  error === 422 &&
    (errorBlock = (
      <div className={classes.error}>
        Erro de processamento, por favor contate um administrador!
      </div>
    ));
  // Server error
  (error === 500 || error === 503 || error === 504) &&
    (errorBlock = (
      <div className={classes.error}>
        Erro de servidor, por favor contate um administrador!
      </div>
    ));

  return (
    <AppBar position="sticky" color="secondary" className={classes.navbar}>
      <Grid container justify="center" item sm={12}>
        {errorBlock}
      </Grid>

      <Toolbar className={classes.navbar_toolbar}>
        {loading || !merchant ? (
          <Spinner />
        ) : (
          <Grid container direction="row">
            <Grid item container justify="center" xs={1}>
              <img
                src={merchant.logo}
                alt="merchant store logo"
                className={classes.navbar_logo}
              />
            </Grid>

            <Grid
              item
              xs={5}
              container
              justify="space-around"
              direction="column"
            >
              <Grid item container>
                <span className={classes.navbar_title}>{merchant.name}</span>

                <Rating value={merchant.rate} readOnly precision={0.25} />
                <span className={classes.navbar_rate}>({merchant.rate})</span>
              </Grid>

              <Grid item container alignItems="center">
                <span className={classes.navbar_subtitle}>
                  Código: {merchant.id}
                </span>
                <Chip label="Online" className={classes.navbar_chip} />
              </Grid>
            </Grid>

            <Grid
              item
              xs={3}
              container
              justify="space-around"
              direction="column"
            >
              <Grid item>
                <span className={classes.navbar_title}>
                  Horário de Funcionamento
                </span>
              </Grid>

              <Grid item>
                <span className={classes.navbar_subtitle}>
                  {merchant.businessStart} às {merchant.businessEnd}
                </span>
              </Grid>
            </Grid>

            <Grid
              item
              xs={3}
              container
              justify="space-around"
              direction="column"
              className={classes.navbar_await}
            >
              <Grid item>
                <span className={classes.navbar_await__title}>
                  Tempo Base de Entrega
                </span>
              </Grid>

              <Grid item>
                <span className={classes.navbar_await__subtitle}>
                  {merchant.basePreparationTime}min
                </span>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};
