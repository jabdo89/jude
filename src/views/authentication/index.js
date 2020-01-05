import React from 'react';
import { Router, Redirect } from '@reach/router';
import AuthLayout from '@layouts/auth';
import Login from './routes/login';
import Signup from './routes/signup';

const Company = () => (
  <AuthLayout>
    <Router>
      <Login path="/login" />
      <Signup path="/signup" />
      <Redirect noThrow from="*" to="/login" />
    </Router>
  </AuthLayout>
);

export default Company;
