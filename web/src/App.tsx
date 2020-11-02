import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Nav, Navbar } from 'react-bootstrap';

import Login from './page/Login';
import Home from './page/Home';
import Callback from './page/Callback';
import { AuthContextProvider } from './context/AuthContext';

export default () => (
    <AuthContextProvider>
        <Router>
            <Navbar>
                <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href='/login'>Login</Nav.Link>
            </Navbar>

            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route path="/callback" component={Callback}></Route>
            </Switch>
        </Router>
    </AuthContextProvider>
);
