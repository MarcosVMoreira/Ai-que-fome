import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import {
  AccountCircleRounded,
  HomeRounded,
  SearchRounded,
  ShoppingCartRounded,
} from '@material-ui/icons';
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CartModal } from '../CartModal/CartModal';
import { ProfileModal } from '../ProfileModal/ProfileModal';
import classes from './BottomNav.module.scss';

export const BottomNav = withRouter(props => {
  const [value, setValue] = useState(0);
  const [profileModal, setProfileModal] = useState(false);
  const [cartModal, setCartModal] = useState(false);

  /* Redux Selectors */
  const cart = useSelector(state => state.cart.cart);

  const handleProfileModal = event => setProfileModal(event);

  const handleCartModal = event => setCartModal(event);

  const handleChange = (event, value) => {
    switch (value) {
      case 0:
        setValue(value);
        props.history.push('/customer/home');
        break;
      case 2:
        handleProfileModal(true);
        break;
      case 3:
        handleCartModal(true);
        break;
      default:
        handleProfileModal(false);
        break;
    }
  };

  return (
    <Fragment>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        className={classes.bottom_nav}
      >
        <BottomNavigationAction label="Home" icon={<HomeRounded />} />
        <BottomNavigationAction label="Procurar" icon={<SearchRounded />} />
        <BottomNavigationAction
          label="Meu Perfil"
          icon={<AccountCircleRounded />}
        />

        <BottomNavigationAction
          label="Carrinho"
          icon={
            <Badge
              color="primary"
              invisible={cart?.length < 1}
              badgeContent={cart?.length}
              max={9}
            >
              <ShoppingCartRounded />
            </Badge>
          }
        />
      </BottomNavigation>

      <ProfileModal handleModal={handleProfileModal} modal={profileModal} />
      <CartModal handleModal={handleCartModal} modal={cartModal} />
    </Fragment>
  );
});
