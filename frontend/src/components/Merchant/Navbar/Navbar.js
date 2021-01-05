import { AppBar, Chip, Grid, Toolbar } from '@material-ui/core';
import React from 'react';
import classes from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <AppBar position="sticky" color="secondary" className={classes.navbar}>
      <Toolbar className={classes.navbar_toolbar}>
        <Grid container direction="row">
          <Grid item container justify="center" xs={1}>
            <img
              src="https://techcrunch.com/wp-content/uploads/2018/07/logo-2.png?w=300"
              alt="merchant store logo"
              className={classes.navbar_logo}
            />
          </Grid>

          <Grid item xs={5} container justify="space-around" direction="column">
            <Grid item>
              <span className={classes.navbar_title}>Mozilla Firefox</span>
            </Grid>

            <Grid item container alignItems="center">
              <span className={classes.navbar_subtitle}>Código: 235753</span>
              <Chip label="Online" className={classes.navbar_chip} />
            </Grid>
          </Grid>

          <Grid item xs={3} container justify="space-around" direction="column">
            <Grid item>
              <span className={classes.navbar_title}>
                Horário de Funcionamento
              </span>
            </Grid>

            <Grid item>
              <span className={classes.navbar_subtitle}>11:00 ás 20:00</span>
            </Grid>
          </Grid>

          <Grid
            item
            xs={3}
            container
            justify="space-around"
            direction="column"
            className={classes.navbar_await}
          >
            <Grid item>
              <span className={classes.navbar_await__title}>
                Tempo Base de Entrega
              </span>
            </Grid>

            <Grid item>
              <span className={classes.navbar_await__subtitle}>20min</span>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
