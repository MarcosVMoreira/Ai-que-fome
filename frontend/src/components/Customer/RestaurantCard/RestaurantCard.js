import { Card, Grid } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React from 'react';
import { categories } from '../../../helpers/enums';
import classes from './RestaurantCard.module.scss';

export const RestaurantCard = props => {
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card className={classes.card} variant="outlined">
        <div className={classes.card_grid}>
          <img
            className={classes.card_logo}
            src={props.logo}
            alt="restaurant logo"
          />

          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="flex-start"
            className={classes.card_info}
          >
            <Grid item>
              <span className={classes.card_title}>{props.name}</span>
            </Grid>

            <Grid item className={classes.card_subtitle}>
              <div className={classes.card_rating}>
                <Rating max={1} readOnly value={1} size="small" />
                <span className={classes.card_rate}>{props.rate}</span>
              </div>
              <span className={classes.card_separator}> • </span>
              <span className={classes.card_text}>
                {categories[props.merchantType[0]]}
              </span>
              <span className={classes.card_separator}> • </span>

              <span className={classes.card_text}>1,1 km</span>
            </Grid>

            <Grid item className={classes.card_subtitle}>
              <span className={classes.card_text}>
                {props.basePreparationTime} min
              </span>
              <span className={classes.card_separator}> • </span>
              <span className={classes.card_text}>R$ 2,99</span>
            </Grid>
          </Grid>
        </div>
      </Card>
    </Grid>
  );
};
