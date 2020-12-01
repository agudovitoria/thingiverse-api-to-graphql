import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './page/Login';
import Home from './page/Home';
import Callback from './page/Callback';
import Navigation from './components/Navigation';
import { AuthContextProvider } from './context/AuthContext';

export default () => (
  <AuthContextProvider>
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/callback" component={Callback}></Route>
      </Switch>
    </Router>
  </AuthContextProvider>
);
