import React from 'react';

class Contact extends React.Component {
  render() {
    return (
      <div className="contact-container">
        <h1>Contact</h1>
        <form action="https://formspree.io/hello@launchtechllc.com" method="POST">
          <label>Name:</label>
          <input className="form-control" type="text" name="Name" placeholder="Name" required />

          <label>Email:</label>
          <input className="form-control" type="email" name="Email" placeholder="Email" required />

          <label>Message:</label>
          <textarea name="Message" className="form-control" placeholder="Message" rows="5" required></textarea>

          <div className="text-center mt-3">
            <input type="submit" className="btn btn-info" value="Contact us!" />
          </div>
        </form>
        <div className="text-center mt-1">
          <small>Or, you can email us at <a href="hello@launchtechllc.com">hello@launchtechllc.com</a>.</small>
        </div>
      </div>
    )
  }
}

export default Contact;
