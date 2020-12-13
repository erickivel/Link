import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Registrer from '../pages/Register';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/registro" component={Registrer} />

      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default Routes;
