import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
  AccountCircleRounded,
  HomeRounded,
  SearchRounded,
  ShoppingCartRounded,
} from '@material-ui/icons';
import React, { Fragment, useState } from 'react';
import { ProfileModal } from '../../ProfileModal/ProfileModal';
import classes from './BottomNav.module.scss';

export const BottomNav = () => {
  const [value, setValue] = useState(0);
  const [modal, setModal] = useState(false);

  const handleModal = event => setModal(event);

  const handleChange = (event, value) => {
    setValue(value);

    switch (value) {
      case 2:
        handleModal(true);
        break;
      default:
        handleModal(false);
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
          icon={<ShoppingCartRounded />}
        />
      </BottomNavigation>

      <ProfileModal handleModal={handleModal} modal={modal} />
    </Fragment>
  );
};
