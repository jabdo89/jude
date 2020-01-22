import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthLayout from '@layouts/auth';
import Login from './routes/login';
import Signup from './routes/signup';

const Public = () => (
  <AuthLayout>
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
