import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// COMPONENTS
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Contact from './components/Contact.js';
import Organizations from './components/Organizations.js';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Navbar/>

          <Switch>
            <div className="container">
              <div className="hover-container">
                <Route path="/organizations" component={Organizations}/>
              </div>
            </div>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
