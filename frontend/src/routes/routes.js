import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from '../pages/home/home.page';
import LoginPage from '../pages/login/login.page';

const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">{/* Register */}</Route>
          <Route path="/reset">{/* Reset */}</Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
