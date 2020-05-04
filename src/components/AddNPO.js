import React, { useState } from 'react';

// COMPONENTS
import Modal from "react-bootstrap/Modal";

// IMPORTS
import firebase from '../firebase.js';


function AddNPO() {
  const [isOpen, setIsOpen] = useState(false); // MODAL VARIABLES
  const organizationsRef = firebase.database().ref("organizations") // FIREBASE

  // FORM VARIABLES
  const [orgName, setOrgName] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgDescription, setOrgDescription] = useState("");

  // MODAL FUNCTIONS
  const showModal = () => { setIsOpen(true); };
  const hideModal = () => { setIsOpen(false); };

  // FORM FUNCTIONS
  const onOrgNameChange = (event) => { setOrgName(event.target.value); }
  const onOrgEmailChange = (event) => { setOrgEmail(event.target.value); }
  const onOrgDescriptionChange = (event) => { setOrgDescription(event.target.value); }

  const addNPO = (event) => {
    event.preventDefault();

    setIsOpen(false);

    // SAVE TO FIREBASE
    organizationsRef.push({
      name: orgName,
      email: orgEmail,
      description: orgDescription,
    })
  }

  return (
    <div>
      <button class="btn btn-success ml-2" onClick={showModal}>Add NPO</button>

      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <h3>Add your nonprofit organization</h3>
        </Modal.Header>
        <form onSubmit={addNPO}>
          <Modal.Body>
            <label>Organization Name:</label>
            <input className="form-control mb-2" type="text" onChange={onOrgNameChange} required />

            <label>Organization Email:</label>
            <input className="form-control mb-2" type="email" onChange={onOrgEmailChange} required />

            <label>Organization Description:</label>
            <textarea className="form-control mb-2" rows="5" onChange={onOrgDescriptionChange} required />

            <label>Organization Website:</label>
            <input className="form-control mb-2" type="url" onChange={onOrgNameChange} required />

            <label className="mt-3">Gender: (that your organization targets)</label>
            <br/>
            <select>
              <option value="Everyone">Everyone</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
            </select>

            <br/>

            <label className="mt-4">Looking for:</label>
            <div className="looking-for-checkboxes">
              <div><input type="checkbox" value="Members"/> <label>Members</label></div>
              <div><input type="checkbox" value="Partnerships"/> <label>Partnerships</label></div>
              <div><input type="checkbox" value="Sponsors"/> <label>Sponsors</label></div>
              <div><input type="checkbox" value="Clients"/> <label>Clients</label></div>
              <div><input type="checkbox" value="Opportunities"/> <label>Opportunities</label></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <input class="btn btn-success" type="submit" value="Submit"/>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}

export default AddNPO;
