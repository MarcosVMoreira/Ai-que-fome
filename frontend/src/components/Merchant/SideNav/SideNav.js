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
  FastfoodOutlined,
  RestaurantMenuOutlined,
  SettingsOutlined,
} from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import classes from './SideNav.module.scss';

export const SideNav = withRouter(props => {
  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onLogout = () => dispatch(actions.authReset());

  // Customer Logout
  const handleLogout = () => {
    onLogout();
    props.history.push('/merchant/login');
  };

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
          <ListItem button>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <RestaurantMenuOutlined fontSize="large" color="primary" />
              <Typography color="primary">Restaurante</Typography>
            </Grid>
          </ListItem>

          <ListItem button>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <FastfoodOutlined fontSize="large" color="primary" />
              <Typography color="primary">Pedidos</Typography>
            </Grid>
          </ListItem>
        </List>

        <List>
          <ListItem button>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <SettingsOutlined fontSize="large" color="primary" />
              <Typography color="primary">Configurações</Typography>
            </Grid>
          </ListItem>

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
