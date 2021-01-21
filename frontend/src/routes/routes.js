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
import { BottomNav as CustomerBottomNav } from '../components/Customer/BottomNav/BottomNav';
import { Navbar as CustomerNavbar } from '../components/Customer/Navbar/Navbar';
import { Navbar as MerchantNavbar } from '../components/Merchant/Navbar/Navbar';
import { SideNav as MerchantSideNav } from '../components/Merchant/SideNav/SideNav';
import { Home as CustomerHome } from '../pages/Customer/Home/Home';
import { Login as CustomerLogin } from '../pages/Customer/Login/Login';
import { Profile as CustomerProfile } from '../pages/Customer/Profile/Profile';
import { SignUp as CustomerSignUp } from '../pages/Customer/SignUp/SignUp';
import { Home as MerchantHome } from '../pages/Merchant/Home/Home';
import { Login as MerchantLogin } from '../pages/Merchant/Login/Login';
import { Menu as MerchantMenu } from '../pages/Merchant/Menu/Menu';
import { Restaurant as MerchantRestaurant } from '../pages/Merchant/Restaurant/Restaurant';
import { SignUp as MerchantSignUp } from '../pages/Merchant/SignUp/SignUp';
import * as actions from '../store/actions/index';

export const Routes = () => {
  /* Redux Selectors */
  const authenticated = useSelector(state => state.auth.authenticated);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onCheckState = useCallback(() => dispatch(actions.authCheckState()), [
    dispatch,
  ]);

  useEffect(() => {
    onCheckState();
  }, [onCheckState]);

  let routes;
  authenticated
    ? (routes = (
        <Fragment>
          {authenticated === 'customer' ? (
            <Fragment>
              <CustomerNavbar />
              <Hidden mdUp>
                <CustomerBottomNav />
              </Hidden>
            </Fragment>
          ) : (
            <Fragment>
              <MerchantNavbar />
              <MerchantSideNav />
            </Fragment>
          )}
          <Switch>
            <Route path="/customer/home" component={CustomerHome} />
            <Route path="/customer/profile" component={CustomerProfile} />
            <Route path="/merchant/home" component={MerchantHome} />
            <Route path="/merchant/restaurant" component={MerchantRestaurant} />
            <Route path="/merchant/menu" component={MerchantMenu} />
            <Redirect to={`/${authenticated}/home`} />
          </Switch>
        </Fragment>
      ))
    : (routes = (
        <Switch>
          <Route path="/customer/login" component={withRouter(CustomerLogin)} />
          <Route
            path="/customer/signup"
            component={withRouter(CustomerSignUp)}
          />
          <Route path="/merchant/login" component={withRouter(MerchantLogin)} />
          <Route
            path="/merchant/signup"
            component={withRouter(MerchantSignUp)}
          />
          <Redirect to="/customer/login" />
        </Switch>
      ));

  return <BrowserRouter> {routes} </BrowserRouter>;
};
