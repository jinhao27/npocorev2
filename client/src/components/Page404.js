import React from 'react';
import { Helmet } from "react-helmet";

function Page404() {

  return (
    <div>
      <Helmet>
        <title>NPO Core - Page not found!</title>
      </Helmet>
      <div className="float-container">
        <h1>404 - Page not found!</h1>
        <p>
          We're sorry, but we couldn't find the page you were looking for! Please make sure you were given or typed in the URL you were looking for correctly, or please <a href="/contact">contact us</a> if you believe this is a true issue. So sorry for the inconvenience!
        </p>
        <div className="cta-buttons">
          <a className="ghost-cta-button" href="/contact">Contact us</a>
          <a className="solid-cta-button" href="/">Return to home page</a>
        </div>
      </div>
    </div>
  )
}

export default Page404;
