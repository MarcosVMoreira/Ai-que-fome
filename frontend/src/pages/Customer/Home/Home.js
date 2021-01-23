import { Grid, Snackbar } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { CategoriesCarousel } from '../../../components/Customer/CategoriesCarousel/CategoriesCarousel';
import { RestaurantCard } from '../../../components/Customer/RestaurantCard/RestaurantCard';
import { Spinner } from '../../../components/Shared/Spinner/Spinner';
import { Toast } from '../../../components/Shared/Toast/Toast';
import * as actions from '../../../store/actions/index';
import classes from './Home.module.scss';

export const Home = () => {
  /* Redux Selectors */
  const restaurants = useSelector(state => state.restaurant.restaurants);
  const error = useSelector(state => state.restaurant.error);
  const loading = useSelector(state => state.restaurant.loading);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchRestaurants = useCallback(
    () => dispatch(actions.fetchRestaurants()),
    [dispatch],
  );

  useEffect(() => {
    onFetchRestaurants();
  }, [onFetchRestaurants]);

  // Set Toast
  const setToast = message => {
    return (
      <Snackbar
        open={true}
        autoHideDuration={10000}
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
    (toast = setToast('Erro de de formulário, preencha todos os campos!'));
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

      <CategoriesCarousel />

      <h3>Restaurantes e Mercados</h3>
      <Grid container spacing={3}>
        {loading || !restaurants ? (
          <Spinner />
        ) : (
          restaurants.map(res => (
            <Grid key={res.id} item xs={12} sm={6} lg={4}>
              <Link to={`restaurant/${res.id}`}>
                <RestaurantCard {...res} />
              </Link>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};
