import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import Loadable from 'react-loadable';

const Requests = Loadable({
  loader: () => import('./routes/requests'),
  loading: TopBarProgress
});

const Messages = Loadable({
  loader: () => import('./routes/messages'),
  loading: TopBarProgress
});

const JobOffers = Loadable({
  loader: () => import('./routes/job-offers'),
  loading: TopBarProgress
});

const Profile = Loadable({
  loader: () => import('./routes/profile'),
  loading: TopBarProgress
});

const Test = Loadable({
  loader: () => import('./routes/test'),
  loading: TopBarProgress
});

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
    <Route path="/personalityTest">
      <Test />
    </Route>
    <Redirect to="/job-offers" />
  </Switch>
);

export default Company;
