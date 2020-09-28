import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Home } from '../pages/Home/Home';
import { Login } from '../pages/Login/Login';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={Home} />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
};
