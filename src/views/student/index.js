import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Requests from './routes/requests';
import Messages from './routes/messages';
import JobOffers from './routes/job-offers';
import Profile from './routes/profile';

const Company = () => (
  <Switch>
    <Route path="/job-offers">
      <JobOffers />
    </Route>
    <Route path="/requests">
      <Requests />
    </Route>
    <Route path="/messages">
      <Messages />
    </Route>
    <Route path="/@:username">
      <Profile />
    </Route>
    <Redirect to="/job-offers" />
  </Switch>
);

export default Company;
