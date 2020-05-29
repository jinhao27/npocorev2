import React from 'react';
import { Link } from "react-router-dom";

// COMPONENTS
import AddNPO from './AddNPO.js';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img className="npocore-logo" src="img/npocore.png" alt="" />
          </a>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navbar-target">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar-target">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/organizations">Organizations</Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/posts">Posts</a>
              </li>
              <li className="nav-item">
                <a className="btn btn-info npo-button" href="/login">Login/Register</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;
