import React, { Fragment } from 'react';
import { CategoriesCarousel } from '../../../components/Customer/CategoriesCarousel/CategoriesCarousel';
import classes from './Home.module.scss';

export const Home = () => {
  return (
    <Fragment>
      <div className={classes.home}>
        <CategoriesCarousel />
      </div>
    </Fragment>
  );
};
