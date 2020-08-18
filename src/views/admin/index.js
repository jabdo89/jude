import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import Loadable from 'react-loadable';

const AddCompany = Loadable({
  loader: () => import('./routes/add-company'),
  loading: TopBarProgress
});

const Company = () => (
  <Switch>
    <Route path="/add-company">
      <AddCompany />
    </Route>
    <Redirect to="/add-company" />
  </Switch>
);

export default Company;
