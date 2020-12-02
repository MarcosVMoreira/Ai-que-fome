import React, { Fragment, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';

import { Hidden } from '@material-ui/core';

import * as actions from '../store/actions/index';

import { Home } from '../pages/Home/Home';
import { Login } from '../pages/Login/Login';
import { SignUp } from '../pages/SignUp/SignUp';
import { Profile } from '../pages/Profile/Profile';
import { Navbar } from '../components/UI/Navbar/Navbar';
import { BottomNav } from '../components/UI/BottomNav/BottomNav';

export const Routes = () => {
  /* Redux Selectors */
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onCheckState = useCallback(() => dispatch(actions.authCheckState()), [
    dispatch,
  ]);

  useEffect(() => {
    onCheckState();
  }, [onCheckState]);

  let routes;
  isAuthenticated
    ? (routes = (
        <Fragment>
          <Navbar />
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/profile" component={Profile} />
            <Redirect to="/home" />
          </Switch>
          <Hidden mdUp>
            <BottomNav />
          </Hidden>
        </Fragment>
      ))
    : (routes = (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={withRouter(SignUp)} />
          <Redirect to="/login" />
        </Switch>
      ));

  return <BrowserRouter> {routes} </BrowserRouter>;
};
