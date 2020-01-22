import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import DashboardLayout from '@layouts/dashboard';
import Students from './routes/students';
import Requests from './routes/requests';
import Messages from './routes/messages';
import JobOffers from './routes/job-offers';
import Settings from './routes/settings';

const Company = () => (
  <DashboardLayout>
    <Switch>
      <Route path="/students">
        <Students />
      </Route>
      <Route path="/requests">
        <Requests />
      </Route>
      <Route path="/messages">
        <Messages />
      </Route>
      <Route path="/job-offers">
        <JobOffers />
      </Route>
      <Route path="/settings">
        <Settings />
      </Route>
      <Redirect to="/students" />
    </Switch>
  </DashboardLayout>
);

export default Company;
