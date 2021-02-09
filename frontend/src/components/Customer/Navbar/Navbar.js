import {
  AppBar,
  Badge,
  Fab,
  Grid,
  Hidden,
  IconButton,
  InputBase,
  Toolbar,
} from '@material-ui/core';
import { CloseIcon } from '@material-ui/data-grid';
import {
  AccountCircleRounded,
  ExpandMoreRounded,
  LocationOnOutlined,
  Search,
  ShoppingCartRounded,
} from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { Logo } from '../../Shared/Logo/Logo';
import { AddressModal } from '../AddressModal/AddressModal';
import { CartPopover } from '../CartPopover/CartPopover';
import { ProfilePopover } from '../ProfilePopover/ProfilePopover';
import classes from './Navbar.module.scss';

export const Navbar = withRouter(props => {
  /* React State Hooks */
  const [search, setSearch] = useState('');
  const [address, setAddress] = useState(null);
  const [modal, setModal] = useState(false);
  const [profilePopover, setProfilePopover] = useState(null);
  const [cartPopover, setCartPopover] = useState(null);

  /* Redux Selectors */
  const cart = useSelector(state => state.cart.cart);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchRestaurants = useCallback(
    payload => dispatch(actions.fetchRestaurants(payload)),
    [dispatch],
  );
  const onFetchRestaurantsFilter = payload =>
    dispatch(actions.fetchRestaurantsFilter(payload));

  useEffect(() => {
    const storedAddress = localStorage.getItem('IFOOD_address');

    if (storedAddress) {
      setAddress(JSON.parse(storedAddress));
      onFetchRestaurants({
        coordinates: JSON.parse(storedAddress).coordinates,
      });
    } else {
      setModal(true);
    }
  }, [onFetchRestaurants]);

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const handleFilter = event => {
    if (event.key === 'Enter') {
      const storedAddress = localStorage.getItem('IFOOD_address');

      if (storedAddress) {
        onFetchRestaurantsFilter({
          coordinates: JSON.parse(storedAddress).coordinates,
          name: search,
        });
      }
    }
  };

  const handleResetFilter = () => {
    setSearch('');
    const storedAddress = localStorage.getItem('IFOOD_address');

    if (storedAddress) {
      setAddress(JSON.parse(storedAddress));
      onFetchRestaurants({
        coordinates: JSON.parse(storedAddress).coordinates,
      });
    }
  };

  const handleAddress = address => {
    localStorage.setItem('IFOOD_address', JSON.stringify(address));
    setModal(false);
    setAddress(address);
    onFetchRestaurants({ coordinates: address.coordinates });
  };

  const handleModal = event => setModal(event);

  const handleProfilePopover = event => setProfilePopover(event.currentTarget);

  const handleCartPopover = event => setCartPopover(event.currentTarget);

  const handleHome = () => props.history.push('/customer/home');

  return (
    <AppBar position="sticky" color="secondary">
      <Toolbar>
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Hidden mdDown>
            <Grid item lg={2}>
              <Logo header={true} handleClick={handleHome} />
            </Grid>
          </Hidden>

          <Grid
            container
            item
            justify="center"
            alignItems="center"
            xs={12}
            lg={6}
            spacing={2}
          >
            <Hidden mdDown>
              <Grid item lg={6}>
                <InputBase
                  className={classes.navbar_input}
                  name="search"
                  placeholder="Procurar..."
                  value={search}
                  onChange={handleSearch}
                  onKeyDown={handleFilter}
                  startAdornment={
                    <Search className={classes.navbar_input__icon} />
                  }
                  endAdornment={
                    search && (
                      <IconButton size="small" onClick={handleResetFilter}>
                        <CloseIcon />
                      </IconButton>
                    )
                  }
                />
              </Grid>
            </Hidden>

            <Grid item xs={12} lg={6}>
              <Fab
                variant="extended"
                className={`${classes.navbar_modal} ${classes.navbar_fab}`}
                onClick={() => handleModal(true)}
              >
                <Grid container justify="space-between" alignItems="center">
                  <Grid item container justify="flex-start" xs={10}>
                    <LocationOnOutlined className={classes.navbar_fab__icon} />
                    <div className={classes.navbar_fab__text}>
                      {address
                        ? `${address.streetName}, ${address.streetNumber}`
                        : 'Endereço de entrega'}
                    </div>
                  </Grid>

                  <ExpandMoreRounded />
                </Grid>
              </Fab>
            </Grid>
          </Grid>

          <Hidden mdDown>
            <Grid
              container
              item
              justify="center"
              alignItems="center"
              xs={3}
              lg={4}
              spacing={2}
            >
              <Grid item>
                <Fab
                  variant="extended"
                  className={classes.navbar_fab}
                  onClick={handleProfilePopover}
                >
                  <AccountCircleRounded className={classes.navbar_fab__icon} />
                  Meu Perfil
                </Fab>
              </Grid>

              <Grid item>
                <Badge
                  color="primary"
                  invisible={cart?.length < 1}
                  badgeContent={cart?.length}
                  max={9}
                >
                  <Fab
                    variant="extended"
                    className={classes.navbar_fab}
                    onClick={handleCartPopover}
                  >
                    <ShoppingCartRounded className={classes.navbar_fab__icon} />
                    Carrinho
                  </Fab>
                </Badge>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      </Toolbar>

      <AddressModal
        handleModal={handleModal}
        modal={modal}
        handleAddress={handleAddress}
        address={address}
      />

      <ProfilePopover popover={profilePopover} setPopover={setProfilePopover} />
      <CartPopover popover={cartPopover} setPopover={setCartPopover} />
    </AppBar>
  );
});
