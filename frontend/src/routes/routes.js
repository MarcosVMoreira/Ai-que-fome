import { Hidden } from '@material-ui/core';
import React, { Fragment, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { BottomNav } from '../components/UI/BottomNav/BottomNav';
import { Navbar } from '../components/UI/Navbar/Navbar';
import { Home } from '../pages/Customer/Home/Home';
import { Login } from '../pages/Customer/Login/Login';
import { Profile } from '../pages/Customer/Profile/Profile';
import { SignUp } from '../pages/Customer/SignUp/SignUp';
import * as actions from '../store/actions/index';

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
