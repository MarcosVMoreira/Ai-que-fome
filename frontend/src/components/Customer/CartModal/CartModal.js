import {
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
} from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Cart } from '../Cart/Cart';
import classes from './CartModal.module.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CartModal = withRouter(props => {
  // Closes the modal
  const handleClose = () => {
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
        <Grid item xs={2}>
          <IconButton onClick={handleClose}>
            <CloseRounded />
          </IconButton>
        </Grid>

        <Grid container item xs alignItems="center" justify="center">
          <DialogTitle>Carrinho</DialogTitle>
        </Grid>

        <Grid item xs={2} />
      </Grid>

      <div>
        <Cart button close={handleClose} />
      </div>
    </Dialog>
  );
});
