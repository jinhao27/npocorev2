import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div className="home-container">
      <div>
        <h1 class="display-2">NPO Core</h1>
        <h4>NPO Core is an online platform for nonprofit organizations to promote their brand, form partnerships, and reach out to anyone!</h4>
        <div className="cta-buttons mt-4">
          <Link className="solid-cta-button" to="/organizations">Check out our organizations!</Link>
          <Link className="ghost-cta-button" to="/cohort">Join our cohort!</Link>
        </div>
      </div>
      <img src="/img/illustration.png"/>
    </div>
  )
}

export default Home;
