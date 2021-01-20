import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Slide,
} from '@material-ui/core';
import {
  AccountCircleRounded,
  ChevronRightRounded,
  CloseRounded,
  ExitToAppRounded,
  FastfoodRounded,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import classes from './ProfileModal.module.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ProfileModal = withRouter(props => {
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

  // Closes the modal
  const handleClose = () => {
    props.handleModal(false);
  };

  // Customer Logout
  const handleLogout = () => {
    onLogout();
    props.history.push('/customer/login');
  };

  // Go to Customer Profile Page
  const handleProfile = () => {
    props.history.push('/customer/profile');
    props.handleModal(false);
  };

  return (
    <Dialog
      open={props.modal}
      onClose={() => props.handleModal(false)}
      TransitionComponent={Transition}
      fullWidth
      fullScreen
    >
      <Grid container alignItems="center" className={classes.modal}>
        <Grid item xs={2} />

        <Grid item xs={8} className={classes.modal_title}>
          Olá, {username ? username : 'Usuário'}
        </Grid>

        <Grid item xs={2}>
          <IconButton onClick={handleClose}>
            <CloseRounded />
          </IconButton>
        </Grid>
      </Grid>

      <DialogContent>
        <Grid item>
          <Button
            className={classes.modal_button}
            color="primary"
            size="large"
            startIcon={<FastfoodRounded />}
            endIcon={<ChevronRightRounded />}
          >
            Pedidos
          </Button>
        </Grid>

        <Grid item>
          <Button
            className={classes.modal_button}
            color="primary"
            size="large"
            startIcon={<AccountCircleRounded />}
            endIcon={<ChevronRightRounded />}
            onClick={handleProfile}
          >
            Minha Conta
          </Button>
        </Grid>

        <Grid item>
          <Button
            className={classes.modal_button}
            color="primary"
            size="large"
            startIcon={<ExitToAppRounded />}
            onClick={handleLogout}
            endIcon={<ChevronRightRounded />}
          >
            Sair
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
});
