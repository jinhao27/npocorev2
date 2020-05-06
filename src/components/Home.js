import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div className="home-container">
      <div>
        <h1 class="display-2">NPO Core</h1>
        <h4>NPO Core is an online platform for nonprofit organizations to promote their brand, form partnerships, and reach out to anyone!</h4>
        <div className="cta-buttons mt-4">
          <Link className="ghost-cta-button" to="/organizations">Our organizations!</Link>
          <a class="solid-cta-button" href="https://join.slack.com/t/npocore/shared_invite/zt-dybo6qvb-ofo_~hCA5Zarn7bP2qhpow" target="_">Join the Slack!</a>
        </div>
      </div>
      <img src="/img/illustration.png"/>
    </div>
  )
}

export default Home;
