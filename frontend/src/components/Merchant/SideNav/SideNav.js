import {
  Drawer,
  Grid,
  List,
  ListItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  ExitToAppRounded,
  FastfoodRounded,
  HomeRounded,
  MenuBookRounded,
  RestaurantMenuRounded,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import classes from './SideNav.module.scss';

export const SideNav = withRouter(props => {
  /* Redux State Hooks */
  const [activeRoute, setActiveRoute] = useState(null);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onLogout = () => dispatch(actions.authReset());

  // Customer Logout
  const handleLogout = () => {
    onLogout();
    props.history.push('/merchant/login');
  };

  useEffect(() => {
    setActiveRoute(props.history.location.pathname);
  }, [props.history.location]);

  return (
    <Drawer className={classes.sidenav} variant="permanent">
      <Toolbar className={classes.sidenav_toolbar} />

      <Grid
        container
        direction="column"
        justify="space-between"
        className={classes.sidenav_list}
      >
        <List>
          <Link to="/merchant/home">
            <ListItem button selected={activeRoute === '/merchant/home'}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <HomeRounded fontSize="large" color="primary" />
                <Typography color="primary">Início</Typography>
              </Grid>
            </ListItem>
          </Link>

          <Link to="/merchant/restaurant">
            <ListItem button selected={activeRoute === '/merchant/restaurant'}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <RestaurantMenuRounded fontSize="large" color="primary" />
                <Typography color="primary">Restaurante</Typography>
              </Grid>
            </ListItem>
          </Link>

          <Link to="/merchant/menu">
            <ListItem button selected={activeRoute === '/merchant/menu'}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <MenuBookRounded fontSize="large" color="primary" />
                <Typography color="primary">Cardápio</Typography>
              </Grid>
            </ListItem>
          </Link>

          <Link to="/merchant/orders">
            <ListItem button selected={activeRoute === '/merchant/orders'}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <FastfoodRounded fontSize="large" color="primary" />
                <Typography color="primary">Pedidos</Typography>
              </Grid>
            </ListItem>
          </Link>
        </List>

        <List>
          <ListItem button onClick={handleLogout}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <ExitToAppRounded fontSize="large" color="primary" />
              <Typography color="primary">Sair</Typography>
            </Grid>
          </ListItem>
        </List>
      </Grid>
    </Drawer>
  );
});
