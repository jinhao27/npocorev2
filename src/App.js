import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// COMPONENTS
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Organizations from './components/Organizations.js';
import Cohort from './components/Cohort.js';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Navbar/>

          <Switch>
            <div className="container">
              <div className="hover-container">
                <Route exact={true} path="/" component={Home}/>
                <Route path="/organizations" component={Organizations}/>
                <Route path="/cohort" component={Cohort}/>
              </div>
            </div>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
