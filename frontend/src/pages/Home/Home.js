import React, { Fragment } from 'react';

import { Hidden } from '@material-ui/core';

import { BottomNav } from '../../components/UI/BottomNav/BottomNav';
import { Navbar } from '../../components/UI/Navbar/Navbar';

import classes from './Home.module.scss';

export const Home = () => {
  return (
    <Fragment>
      <div>
        <Navbar />
      </div>

      <div className={classes.home}>
        <div>Home!</div>
      </div>

      <Hidden mdUp>
        <BottomNav />
      </Hidden>
    </Fragment>
  );
};
