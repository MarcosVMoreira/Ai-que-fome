import { Button, Grid, Snackbar } from '@material-ui/core';
import { ExpandLessRounded, ExpandMoreRounded } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { RestaurantInfo } from '../../../components/Customer/RestaurantInfo/RestaurantInfo';
import { Spinner } from '../../../components/Shared/Spinner/Spinner';
import { Toast } from '../../../components/Shared/Toast/Toast';
import * as actions from '../../../store/actions/index';
import classes from './Restaurant.module.scss';

export const Restaurant = () => {
  /* State Hooks */
  const [showMore, setShowMore] = useState(false);

  /* Redux Selectors */
  const restaurant = useSelector(state => state.restaurant.restaurant);
  const error = useSelector(state => state.signUp.error);
  const loading = useSelector(state => state.signUp.loading);

  const { id } = useParams();

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchRestaurant = useCallback(
    restaurantId => dispatch(actions.fetchRestaurant(restaurantId)),
    [dispatch],
  );

  useEffect(() => {
    onFetchRestaurant(id);
  }, [onFetchRestaurant, id]);

  const handleShowMore = () => {
    setShowMore(state => !state);
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
  // If we get a 400 error
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
    <div className={classes.container}>
      {redirect}
      {toast}

      {!restaurant || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className={classes.container_detail}>
            <Grid container>
              <Grid item xs={12}>
                <img
                  className={classes.container_detail__image}
                  src="https://static-images.ifood.com.br/image/upload//capa/201805241343_9f7ee192-ac96-4dca-9525-189c0b884036_capa1@2x.jpg"
                  alt="restaurant"
                />
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={2}>
                  <img
                    src={restaurant.logo}
                    alt="restaurant logo"
                    className={classes.container_detail__logo}
                  />
                </Grid>

                <Grid container alignItems="center" item xs>
                  <span className={classes.container_detail__title}>
                    {restaurant.name}
                  </span>

                  <Grid container alignItems="center" item xs>
                    <Rating max={1} readOnly value={1} />
                    <span className={classes.container_detail__rate}>
                      {restaurant.rate}
                    </span>
                  </Grid>

                  <Button
                    color="primary"
                    size="small"
                    endIcon={
                      showMore ? <ExpandLessRounded /> : <ExpandMoreRounded />
                    }
                    onClick={handleShowMore}
                  >
                    Ver mais
                  </Button>
                </Grid>
              </Grid>

              {showMore && <RestaurantInfo restaurant={restaurant} />}
            </Grid>
          </div>

          <div className={classes.container_cart}>{restaurant.name}</div>
        </Fragment>
      )}
    </div>
  );
};
