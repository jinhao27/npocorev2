import React from 'react';
import { Link } from "react-router-dom";

// COMPONENTS
import AddNPO from './AddNPO.js';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img className="npocore-logo" src="img/npocore.png" alt="" />
          </Link>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navbar-target">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar-target">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/organizations">Organizations</Link>
              </li>
              <li className="nav-item">
                <AddNPO/>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;
