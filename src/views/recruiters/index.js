import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import Loadable from 'react-loadable';

const StudentMessages = Loadable({
  loader: () => import('./routes/recruiter-students'),
  loading: TopBarProgress
});

const Profile = Loadable({
  loader: () => import('./routes/profile'),
  loading: TopBarProgress
});

const Recruiters = () => (
  <Switch>
    <Route path="/students">
      <StudentMessages />
    </Route>
    <Route path="/@:username">
      <Profile />
    </Route>
    <Redirect to="/students" />
  </Switch>
);

export default Recruiters;
