import React from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './commons/Login';
import Customer from './commons/CommonPlate';
import RequestIntegrity from './requestIntegrity/RequestIntegrity';
import Pdf from './commons/pdf/pdf';
import Test from './libs/Test';

const App = () => (
    <div>
        <Router onUpdate={() => window.scrollTo(0, 0)}>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/customer" component={Customer} />
                <Route exact path="/request" component={Customer} />
                <Route exact path="/requestIntegrity" component={RequestIntegrity} />
                <Route exact path="/reports" component={Customer} />
                <Route exact path="/pdf" component={Pdf} />
                <Route exact path="/test" component={Test} />
            </Switch>
        </Router>
    </div>
);

export default App;
