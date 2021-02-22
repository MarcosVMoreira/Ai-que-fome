import { Grid } from '@material-ui/core';
import React from 'react';
import { orderStatus } from '../../../helpers/enums';
import classes from './OrderCard.module.scss';

export const OrderCard = props => {
  return (
    <div className={classes.card} onClick={props.onClick}>
      <div className={classes.card_grid}>
        <img
          className={classes.card_logo}
          src={props.merchantLogo}
          alt="restaurant logo"
        />

        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="flex-start"
          className={classes.card_info}
          spacing={1}
        >
          <Grid item className={classes.card_title}>
            <span>{props.merchantName}</span>
          </Grid>

          <Grid item className={classes.card_subtitle}>
            {props.items
              .map(item => `${item.quantity}x ${item.name}`)
              .join(',')}
          </Grid>

          <Grid item className={classes.card_status}>
            Status: {orderStatus[props.orderStatus]}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
