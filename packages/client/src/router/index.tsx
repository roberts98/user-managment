import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import SignIn from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import RegisterPage from '../pages/RegisterPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact component={DashboardPage} />
        <PublicRoute path="/login" component={SignIn} />
        <PublicRoute path="/register" component={RegisterPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
