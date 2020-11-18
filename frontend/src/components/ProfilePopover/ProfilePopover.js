import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Grid, Popover } from '@material-ui/core';
import {
  AccountCircleRounded,
  ExitToAppRounded,
  FastfoodRounded,
} from '@material-ui/icons';

import classes from './ProfilePopover.module.scss';
import * as actions from '../../store/actions/index';

export const ProfilePopover = props => {
  const [username, setUsername] = useState(null);

  const dispatch = useDispatch();
  const onLogout = () => dispatch(actions.authReset());

  useEffect(() => {
    setUsername(localStorage.getItem('IFOOD_name'));
  }, []);

  const handleClose = () => {
    props.setPopover(null);
  };

  const handleLogout = () => {
    onLogout();
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
};
