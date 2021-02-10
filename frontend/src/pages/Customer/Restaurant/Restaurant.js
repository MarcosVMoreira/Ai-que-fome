import { Button, Grid, Hidden, InputBase, Snackbar } from '@material-ui/core';
import {
  ExpandLessRounded,
  ExpandMoreRounded,
  Search,
} from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import empty from '../../../assets/icons/empty.svg';
import { Cart } from '../../../components/Customer/Cart/Cart';
import { MenuCard } from '../../../components/Customer/MenuCard/MenuCard';
import { MenuModal } from '../../../components/Customer/MenuModal/MenuModal';
import { RestaurantInfo } from '../../../components/Customer/RestaurantInfo/RestaurantInfo';
import { Spinner } from '../../../components/Shared/Spinner/Spinner';
import { Toast } from '../../../components/Shared/Toast/Toast';
import * as actions from '../../../store/actions/index';
import classes from './Restaurant.module.scss';

export const Restaurant = () => {
  /* State Hooks */
  const [showMore, setShowMore] = useState(false);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  /* Redux Selectors */
  const restaurant = useSelector(state => state.restaurant.restaurant);
  const cart = useSelector(state => state.cart.cart);
  const cartRestaurant = useSelector(state => state.cart.restaurant);
  const error = useSelector(state => state.signUp.error);
  const loading = useSelector(state => state.signUp.loading);

  const { id } = useParams();

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchRestaurant = useCallback(
    restaurantId => dispatch(actions.fetchRestaurant(restaurantId)),
    [dispatch],
  );
  const onAddCartItem = cart => dispatch(actions.addCartItem(cart));

  /* Functions */
  useEffect(() => {
    const storedAddress = localStorage.getItem('IFOOD_address');

    if (storedAddress) {
      onFetchRestaurant({
        coordinates: JSON.parse(storedAddress).coordinates,
        id: id,
      });
    }
  }, [onFetchRestaurant, id]);

  useEffect(() => {
    if (restaurant) {
      setCategories(restaurant.categories);
    }
  }, [restaurant]);

  useEffect(() => {
    localStorage.setItem(
      'IFOOD_cart',
      JSON.stringify({ cart: cart, restaurant: cartRestaurant }),
    );
  }, [cart, cartRestaurant]);

  /* Toggle Restaurant Info */
  const handleShowMore = () => {
    setShowMore(state => !state);
  };

  /* Search Input */
  const handleSearch = event => {
    let { value } = event.target;

    setSearch(value);
    filterResults(value);
  };

  /* Filter Results based on user Search */
  const filterResults = value => {
    setCategories(
      restaurant.categories
        .map(category => {
          const filter = category.skus.filter(sku =>
            sku.name.toLowerCase().includes(value.toLowerCase()),
          );

          return filter.length ? { ...category, skus: [...filter] } : null;
        })
        .filter(res => res),
    );
  };

  const handleOpenMenuModal = item => {
    setSelectedItem(item);
  };

  const handleCloseMenuModal = item => {
    if (item) {
      onAddCartItem({
        restaurant: restaurant.name,
        restaurantFee: restaurant.fee || 0,
        id: item.id + Math.floor(Math.random() * (100 - 1) + 1),
        itemName: item.name,
        itemPrice: item.totalPrice,
        itemAmount: item.amount,
        subItems: item.options
          .filter(el => el.amount)
          .map(el => ({
            subItemName: el.name,
            subItemAmount: el.amount,
            id: el.id,
          })),
      });
    }

    setSelectedItem(null);
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
          <Grid container justify="center">
            <Grid
              item
              xs={11}
              lg={9}
              xl={7}
              className={classes.container_detail}
            >
              <Grid container direction="column">
                <Grid item xs={12}>
                  <img
                    className={classes.container_detail__image}
                    src="https://static-images.ifood.com.br/image/upload//capa/201805241343_9f7ee192-ac96-4dca-9525-189c0b884036_capa1@2x.jpg"
                    alt="restaurant"
                  />
                </Grid>

                <Grid container alignItems="center" item xs={12}>
                  <Grid item xs={3} sm={2}>
                    <img
                      src={restaurant.logo}
                      alt="restaurant logo"
                      className={classes.container_detail__logo}
                    />
                  </Grid>

                  <Grid container alignItems="center" item xs={9} sm={7} md={8}>
                    <span className={classes.container_detail__title}>
                      {restaurant.name}
                    </span>

                    <Grid container alignItems="center" item xs>
                      <Rating max={1} readOnly value={1} />
                      <span className={classes.container_detail__rate}>
                        {restaurant.rate.toFixed(2).replace('.', ',')}
                      </span>
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} sm={3} md={2}>
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

                <Grid item xs>
                  {showMore && <RestaurantInfo restaurant={restaurant} />}
                </Grid>

                <Grid container justify="center" item xs>
                  <InputBase
                    className={classes.container_search}
                    name="search"
                    placeholder="Buscar no cardápio"
                    value={search}
                    onChange={handleSearch}
                    startAdornment={
                      <Search className={classes.container_search__icon} />
                    }
                  />
                </Grid>

                {categories && categories.length > 0 ? (
                  categories.map(category => (
                    <Grid
                      key={category.id}
                      container
                      direction="column"
                      item
                      xs
                    >
                      <h2>{category.name}</h2>

                      <Grid container wrap="wrap" spacing={3} item xs>
                        {category.skus.map(sku => (
                          <Grid key={sku.id} item xs={12} md={6}>
                            <MenuCard
                              {...sku}
                              onClick={() => handleOpenMenuModal(sku)}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  ))
                ) : (
                  <div className={classes.container_empty}>
                    <img src={empty} alt="ilustração de carrinho vazio" />
                    <h3>Nenhum produto encontrado!</h3>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Hidden smDown>
            <div className={classes.container_cart}>
              <Cart />
            </div>
          </Hidden>

          {selectedItem && (
            <MenuModal
              open={Boolean(selectedItem)}
              item={selectedItem}
              close={handleCloseMenuModal}
            />
          )}
        </Fragment>
      )}
    </div>
  );
};
