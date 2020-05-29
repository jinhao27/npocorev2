import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

// COMPONENTS
import AddNPO from './AddNPO.js';

function Navbar() {
  const [organization, setOrganization] = useState({});

  useEffect(async () => {
    await setOrganization(Cookies.get("organization"));
    console.log(organization);
  }, []);

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
              <a className="nav-link" href="/featured">Featured</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/map">Map</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/organizations">Organizations</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/posts">Posts</a>
            </li>

            {organization == undefined ?
              <li className="nav-item">
                <a className="btn btn-info npo-button" href="/login">Login/Register</a>
              </li>
              :
              <li className="nav-item">
                <a className="nav-link" href={"/organizations/" + organization._id}>My Organization</a>
              </li>
            }
            {organization != undefined ?
            <li className="nav-item">
              <a className="nav-link" href="/logout">Logout</a>
            </li>
            : <span></span>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
