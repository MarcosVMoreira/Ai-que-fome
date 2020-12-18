import { Hidden } from '@material-ui/core';
import React, { Fragment, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { BottomNav } from '../components/UI/BottomNav/BottomNav';
import { Navbar } from '../components/UI/Navbar/Navbar';
import { Home } from '../pages/Customer/Home/Home';
import { Login as CustomerLogin } from '../pages/Customer/Login/Login';
import { Profile } from '../pages/Customer/Profile/Profile';
import { SignUp } from '../pages/Customer/SignUp/SignUp';
import { Login as MerchantLogin } from '../pages/Merchant/Login/Login';
import { NotFound } from '../pages/NotFound/NotFound';
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
            <Route path="*" component={Home} />
          </Switch>
          <Hidden mdUp>
            <BottomNav />
          </Hidden>
        </Fragment>
      ))
    : (routes = (
        <Switch>
          <Route path="/login" component={withRouter(CustomerLogin)} />
          <Route path="/signup" component={withRouter(SignUp)} />
          <Route path="/merchant" component={withRouter(MerchantLogin)} />
          <Route path="/not-found" component={withRouter(NotFound)} />
          <Route path="*" component={withRouter(CustomerLogin)} />
        </Switch>
      ));

  return <BrowserRouter> {routes} </BrowserRouter>;
};
