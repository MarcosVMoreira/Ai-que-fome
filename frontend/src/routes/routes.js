import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';

import { Home } from '../pages/Home/Home';
import { Login } from '../pages/Login/Login';
import { SignUp } from '../pages/SignUp/SignUp';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={withRouter(SignUp)} />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
};
