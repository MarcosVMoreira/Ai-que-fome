import { Card, Grid } from '@material-ui/core';
import React from 'react';
import default_sku from '../../../assets/icons/default_sku.svg';
import classes from './MenuCard.module.scss';

export const MenuCard = props => {
  return (
    <Card className={classes.card} variant="outlined" onClick={props.onClick}>
      <div className={classes.card_grid}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item>
            <span className={classes.card_title}>{props.name}</span>
          </Grid>

          <Grid item>
            <span className={classes.card_description}>
              {props.description}
            </span>
          </Grid>

          <Grid item>
            <span className={classes.card_price}>
              R${props.price.toFixed(2).replace('.', ',')}
            </span>
          </Grid>
        </Grid>

        <img
          className={classes.card_logo}
          src={props.image ? props.image : default_sku}
          alt="restaurant logo"
        />
      </div>
    </Card>
  );
};
