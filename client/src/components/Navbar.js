import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

// COMPONENTS
import AddNPO from './AddNPO.js';

function Navbar() {
  const [organization, setOrganization] = useState({});
  const [cookies, setCookie] = useCookies(['name']);

  useEffect(async () => {
    await setOrganization(cookies.organization);
  }, []);

  return (
    <nav className="navbar navbar-expand-sm navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src="/static/img/npocore.png" alt="NPO Core Logo"/>
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
              <a className="nav-link" href="/organizations">Organizations</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/posts">Posts</a>
            </li>

            {organization == undefined ?
              <li className="nav-item">
                <a className="btn btn-info npo-button" href="/login">Login/Register</a>
              </li>
              :
              <li className="nav-item dropdown">
                <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {organization.logo ?
                    <div className="image-cropper">
                      <img className="nav-logo" src={"/static/media/logos/" + organization.logo} alt=""/>
                    </div>
                    :
                    <div className="image-cropper">
                      <img className="nav-logo" src="/static/img/no-logo.png" alt=""/>
                    </div>
                  }
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href={"/organizations/" + organization._id}>View my organization</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/logout">Logout</a>
                </div>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
