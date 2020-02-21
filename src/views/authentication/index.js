import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthLayout from '@layouts/auth';
import { isMobile } from 'react-device-detect';
import TopBarProgress from 'react-topbar-progress-indicator';
import Loadable from 'react-loadable';

const Login = Loadable({
  loader: () => import('./routes/login'),
  loading: TopBarProgress
});

const Signup = Loadable({
  loader: () => import('./routes/signup'),
  loading: TopBarProgress
});

const Public = () => (
  <AuthLayout isMobile={isMobile}>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Redirect to="/login" />
    </Switch>
  </AuthLayout>
);

export default Public;
