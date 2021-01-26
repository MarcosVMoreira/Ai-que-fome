import {
  AppBar,
  Fab,
  Grid,
  Hidden,
  InputBase,
  Toolbar,
} from '@material-ui/core';
import {
  AccountCircleRounded,
  ExpandMoreRounded,
  LocationOnOutlined,
  Search,
  ShoppingCartRounded,
} from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { Logo } from '../../Shared/Logo/Logo';
import { AddressModal } from '../AddressModal/AddressModal';
import { ProfilePopover } from '../ProfilePopover/ProfilePopover';
import classes from './Navbar.module.scss';

export const Navbar = withRouter(props => {
  /* React State Hooks */
  const [search, setSearch] = useState('');
  const [address, setAddress] = useState(null);
  const [modal, setModal] = useState(false);
  const [popover, setPopover] = useState(null);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const fetchRestaurants = useCallback(
    payload => dispatch(actions.fetchRestaurants(payload)),
    [dispatch],
  );

  useEffect(() => {
    const storedAddress = localStorage.getItem('IFOOD_address');

    if (storedAddress) {
      setAddress(JSON.parse(storedAddress));
      fetchRestaurants({ coordinates: JSON.parse(storedAddress).coordinates });
    } else {
      setModal(true);
    }
  }, [fetchRestaurants]);

  const handleSearch = event => setSearch(event.target.value);

  const handleAddress = address => {
    localStorage.setItem('IFOOD_address', JSON.stringify(address));
    setModal(false);
    setAddress(address);
    fetchRestaurants({ coordinates: address.coordinates });
  };

  const handleModal = event => setModal(event);

  const handlePopover = event => setPopover(event.currentTarget);

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
                  startAdornment={
                    <Search className={classes.navbar_input__icon} />
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
                  onClick={handlePopover}
                >
                  <AccountCircleRounded className={classes.navbar_fab__icon} />
                  Meu Perfil
                </Fab>
              </Grid>

              <Grid item>
                <Fab variant="extended" className={classes.navbar_fab}>
                  <ShoppingCartRounded className={classes.navbar_fab__icon} />
                  Carrinho
                </Fab>
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

      <ProfilePopover popover={popover} setPopover={setPopover} />
    </AppBar>
  );
});
