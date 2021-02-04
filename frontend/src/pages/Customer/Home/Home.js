import { Button, Grid, Snackbar } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import empty_restaurants from '../../../assets/icons/empty_restaurants.svg';
import { CategoriesCarousel } from '../../../components/Customer/CategoriesCarousel/CategoriesCarousel';
import { RestaurantCard } from '../../../components/Customer/RestaurantCard/RestaurantCard';
import { Spinner } from '../../../components/Shared/Spinner/Spinner';
import { Toast } from '../../../components/Shared/Toast/Toast';
import * as actions from '../../../store/actions/index';
import classes from './Home.module.scss';

export const Home = () => {
  /* Redux Selectors */
  const restaurants = useSelector(state => state.restaurant.restaurants);
  const filter = useSelector(state => state.restaurant.filter);
  const error = useSelector(state => state.restaurant.error);
  const loading = useSelector(state => state.restaurant.loading);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchRestaurants = payload =>
    dispatch(actions.fetchRestaurants(payload));

  /* Functions */
  const handleRestaurantsReset = () => {
    const storedAddress = localStorage.getItem('IFOOD_address');

    if (storedAddress) {
      onFetchRestaurants({
        coordinates: JSON.parse(storedAddress).coordinates,
      });
    }
  };

  // Set Toast
  const setToast = message => {
    return (
      <Snackbar
        open={true}
        autoHideDuration={2000}
        onClose={() => (toast = '')}
      >
        <Toast onClose={() => (toast = '')} severity="error">
          {message}
        </Toast>
      </Snackbar>
    );
  };

  let toast;
  let redirect;
  // If we get a 400 error, it means the user is trying to submit an incomplete form
  error === 400 &&
    (toast = setToast(
      'Erro de requisição, contate um administrador caso continue vendo este erro!',
    ));
  // If we get a 403 error, it means the user is trying to access something it doesn't have access
  error === 403 &&
    (toast = setToast(
      'Erro de permissão, contate um administrador caso continue vendo este erro!',
    ));
  // If we get a 404 error, it means the user reached a null pointer!
  error === 404 &&
    (toast = setToast(
      'Erro de acesso, contate um administrador caso continue vendo este erro!',
    ));
  // If we get 500, 503 or 504 redirects the user to not found page
  (error === 500 || error === 503 || error === 504) &&
    (redirect = <Redirect to="/not-found" />);

  return (
    <div className={classes.home}>
      {redirect}
      {toast}

      {loading || !restaurants ? (
        <Spinner />
      ) : (
        <Fragment>
          <CategoriesCarousel />

          <Grid
            container
            alignItems="center"
            justify="space-between"
            className={classes.home_title}
          >
            <h3>Restaurantes e Mercados</h3>

            {filter && (
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={handleRestaurantsReset}
              >
                Limpar Filtros
              </Button>
            )}
          </Grid>

          {restaurants.length ? (
            <Grid container spacing={3}>
              {restaurants.map(res => (
                <Grid key={res.merchantId} item xs={12} sm={6} lg={4}>
                  <Link to={`restaurant/${res.merchantId}`}>
                    <RestaurantCard {...res} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          ) : (
            <div className={classes.home_empty}>
              <img
                src={empty_restaurants}
                alt="ilustração de chefe de cozinha"
              />
              <span>Nenhum restaurante encontrado</span>
              <span>Tente pesquisar com outros termos</span>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};
