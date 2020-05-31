import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// COMPONENTS
import Navbar from './components/Navbar.js';
import Organizations from './components/Organizations.js';
import Page404 from './components/Page404.js';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Navbar/>

          <div className="container">
            <div className="hover-container">
              <Switch>
                <Route path="/organizations" component={Organizations}/>
                <Route component={Page404} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
