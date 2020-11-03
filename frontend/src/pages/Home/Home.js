import React, { useEffect, useState } from 'react';

import {
  AppBar,
  Fab,
  Grid,
  Hidden,
  InputBase,
  Toolbar,
} from '@material-ui/core';
import {
  Search,
  AccountCircleRounded,
  ShoppingCartRounded,
  LocationOnOutlined,
  ExpandMoreRounded,
} from '@material-ui/icons';

import { Logo } from '../../components/UI/Logo/Logo';
import { AddressModal } from '../../components/AddressModal/AddressModal';
import classes from './Home.module.scss';

export const Home = () => {
  const [search, setSearch] = useState('');
  const [address, setAddress] = useState(null);
  const [modal, setModal] = useState(true);

  useEffect(() => {
    const storedAddress = localStorage.getItem('IFOOD_address');
    setAddress(JSON.parse(storedAddress));
  }, []);

  const handleSearch = event => setSearch(event.target.value);

  const handleAddress = address => {
    console.log(address);
    localStorage.setItem('IFOOD_address', JSON.stringify(address));
    setModal(false);
    setAddress(address);
  };

  const handleRemoveAddress = index => {
    console.log(index);
  };

  const handleEditAddress = index => {
    console.log(index);
  };

  const handleModal = event => setModal(event);

  return (
    <div>
      <AppBar color="secondary">
        <Toolbar>
          <Grid container justify="center" alignItems="center" spacing={1}>
            <Hidden mdDown>
              <Grid item lg={2}>
                <Logo header={true} />
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
                    className={classes.toolbar_input}
                    name="search"
                    placeholder="Procurar..."
                    value={search}
                    onChange={handleSearch}
                    startAdornment={
                      <Search className={classes.toolbar_input__icon} />
                    }
                  />
                </Grid>
              </Hidden>

              <Grid item xs={12} lg={6}>
                <Fab
                  variant="extended"
                  className={`${classes.toolbar_modal} ${classes.toolbar_fab}`}
                  onClick={() => handleModal(true)}
                >
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item container justify="flex-start" xs={10}>
                      <LocationOnOutlined
                        className={classes.toolbar_fab__icon}
                      />
                      {address
                        ? `${address.streetName}, ${address.streetNumber}`
                        : 'Endereço de entrega'}
                    </Grid>

                    <ExpandMoreRounded />
                  </Grid>
                </Fab>

                <AddressModal
                  handleModal={handleModal}
                  modal={modal}
                  handleAddress={handleAddress}
                  address={address}
                  handleRemoveAddress={handleRemoveAddress}
                  handleEditAddress={handleEditAddress}
                />
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
                  <Fab variant="extended" className={classes.toolbar_fab}>
                    <AccountCircleRounded
                      className={classes.toolbar_fab__icon}
                    />
                    Meu Perfil
                  </Fab>
                </Grid>

                <Grid item>
                  <Fab variant="extended" className={classes.toolbar_fab}>
                    <ShoppingCartRounded
                      className={classes.toolbar_fab__icon}
                    />
                    Carrinho
                  </Fab>
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};
