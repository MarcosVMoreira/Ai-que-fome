import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button, Grid, Popover } from '@material-ui/core';
import {
  AccountCircleRounded,
  ExitToAppRounded,
  FastfoodRounded,
} from '@material-ui/icons';

import classes from './ProfilePopover.module.scss';
import * as actions from '../../store/actions/index';

export const ProfilePopover = withRouter(props => {
  /* React State Hooks */
  const [username, setUsername] = useState(null);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onLogout = () => dispatch(actions.authReset());

  /* Functions */
  // Each time we open the modal, get the customer's name
  useEffect(() => {
    setUsername(localStorage.getItem('IFOOD_name'));
  }, []);

  // Closes the popover
  const handleClose = () => {
    props.setPopover(null);
  };

  // Customer Logout
  const handleLogout = () => {
    onLogout();
  };

  // Go to Customer Profile Page
  const handleProfile = () => {
    props.history.push('/profile');
    props.setPopover(null);
  };

  return (
    <div>
      <Popover
        open={Boolean(props.popover)}
        anchorEl={props.popover}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="stretch"
          className={classes.popover}
        >
          <Grid item className={classes.popover_title}>
            Olá, {username ? username : 'Usuário'}
          </Grid>

          <Grid item>
            <Button
              className={classes.popover_button}
              color="primary"
              size="large"
              startIcon={<FastfoodRounded />}
            >
              Pedidos
            </Button>
          </Grid>

          <Grid item>
            <Button
              className={classes.popover_button}
              color="primary"
              size="large"
              startIcon={<AccountCircleRounded />}
              onClick={handleProfile}
            >
              Minha Conta
            </Button>
          </Grid>

          <Grid item>
            <Button
              className={classes.popover_button}
              color="primary"
              size="large"
              startIcon={<ExitToAppRounded />}
              onClick={handleLogout}
            >
              Sair
            </Button>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
});
