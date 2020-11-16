import React, { Fragment } from 'react';
import { Navbar } from '../../components/UI/Navbar/Navbar';

export const Home = () => {
  return (
    <Fragment>
      <div>
        <Navbar />
      </div>
      <div>Home!</div>
    </Fragment>
  );
};
