import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';

import * as actions from '../store/actions/index';

import { Home } from '../pages/Home/Home';
import { Login } from '../pages/Login/Login';
import { SignUp } from '../pages/SignUp/SignUp';

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
        <Switch>
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
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
