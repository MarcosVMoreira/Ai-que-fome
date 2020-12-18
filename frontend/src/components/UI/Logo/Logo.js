import { Grid } from '@material-ui/core';
import React from 'react';
import merchantLogo from '../../../assets/icons/logo-merchant.webp';
import logo from '../../../assets/icons/logo.webp';
import classes from './Logo.module.scss';

export const Logo = props => (
  <Grid item className={classes.container}>
    <img
      src={props.merchant ? merchantLogo : logo}
      alt="ifood clone logo"
      className={props.header ? classes.toolbar : classes.logo}
      onClick={props.handleClick}
    />
  </Grid>
);
