import { Popover } from '@material-ui/core';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Cart } from '../Cart/Cart';
import classes from './CartPopover.module.scss';

export const CartPopover = withRouter(props => {
  // Closes the popover
  const handleClose = () => {
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
        <div className={classes.popover}>
          <Cart button />
        </div>
      </Popover>
    </div>
  );
});
