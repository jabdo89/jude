import React from 'react';
import { Router, Redirect } from '@reach/router';
import DashboardLayout from '@layouts/dashboard';
import Students from './routes/students';
import Requests from './routes/requests';
import Messages from './routes/messages';
import JobOffers from './routes/job-offers';
import Settings from './routes/settings';

const Company = () => (
  <DashboardLayout>
    <Router>
      <Students path="/students" />
      <Requests path="/requests" />
      <Messages path="/messages" />
      <JobOffers path="/job-offers" />
      <Settings path="/settings" />
      <Redirect noThrow from="*" to="/students" />
    </Router>
  </DashboardLayout>
);

export default Company;
