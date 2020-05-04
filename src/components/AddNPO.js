import React, { useState, useEffect } from 'react';

// COMPONENTS
import Modal from "react-bootstrap/Modal";

// IMPORTS
import alertify from "alertifyjs";
import firebase from '../firebase.js';


function AddNPO() {
  const [isOpen, setIsOpen] = useState(false); // MODAL VARIABLES
  const organizationsRef = firebase.database().ref("organizations") // FIREBASE
  const [organizations, setOrganizations] = useState([]); // NPO ORGANIZATIONS

  // FORM VARIABLES
  const [orgName, setOrgName] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgDescription, setOrgDescription] = useState("");
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgGender, setOrgGender] = useState("");
  const [orgCause, setOrgCause] = useState("");
  const [orgInterests, setOrgInterests] = useState([]);

  // MODAL FUNCTIONS
  const showModal = () => { setIsOpen(true); };
  const hideModal = () => { setIsOpen(false); };

  // FORM FUNCTIONS
  const onOrgNameChange = (event) => { setOrgName(event.target.value); }
  const onOrgEmailChange = (event) => { setOrgEmail(event.target.value); }
  const onOrgDescriptionChange = (event) => { setOrgDescription(event.target.value); }
  const onOrgWebsiteChange = (event) => { setOrgWebsite(event.target.value); }
  const onOrgGenderChange = (event) => { setOrgGender(event.target.value); }
  const onOrgCauseChange = (event) => { setOrgCause(event.target.value); }
  const onOrgInterestChange = (event) => {
    const interestValue = event.target.value;

    let tempOrgInterests = orgInterests;
    if (interestValue in orgInterests) { // IF VALUE WAS ALREADY ADDED, REMOVE IT
      orgInterests.filter(interest => interest !== interestValue);
    } else { // ELSE ADD IT
      tempOrgInterests.push(interestValue);
    }

    setOrgInterests(tempOrgInterests);
  }

  // VALIDATION FUNCTIONS
  const validateOrganizationUniqueness = (newOrganization) => {
    for (let organization of organizations) {
      if (organization.name == newOrganization.name) {
        return "name";
      } else if (organization.email == newOrganization.email) {
        return "email";
      }
    }

    return true;
  }

  const addNPO = (event) => {
    event.preventDefault(); // STOP FORM SUBMISSION

    // CREATE NEW ORGANIZATION
    const newOrganization = {
      name: orgName,
      email: orgEmail,
      description: orgDescription,
      website: orgWebsite,
      gender: orgGender,
      cause: orgCause,
      interests: orgInterests
    }

    const unique = validateOrganizationUniqueness(newOrganization);

    if (unique == true) {
      // SAVE TO FIREBASE
      organizationsRef.push(newOrganization)

      // CLOSE MODAL
      setIsOpen(false);
    } else {
      if (unique == "name") {
        alertify.error("That organization name has been used already.");
      } else if (unique == "email") {
        alertify.error("That organization email has been used already.");
      }
    }
  }

  const getOrganizations = () => {
    let tempOrganizations = [];
    organizationsRef.once("value").then((snapshot) => {
      if (snapshot.val()) {
        for (let organizationObj of Object.entries(snapshot.val())) {
          tempOrganizations.push(organizationObj[1]);
        }
      }

      setOrganizations(tempOrganizations);
    });
  }

  useEffect(() => {
    getOrganizations();
  })

  return (
    <div>
      <button class="btn btn-info npo-button" onClick={showModal}>Add your NPO!</button>

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
            <input className="form-control mb-2" type="url" onChange={onOrgWebsiteChange} required />

            <label className="mt-3">Gender: (that your organization targets)</label>
            <br/>
            <select onChange={onOrgGenderChange} required>
              <option value="">----------</option>
              <option value="Everyone">Everyone</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
            </select>

            <br/>

            <label className="mt-3">Cause:</label>
            <br/>
            <select onChange={onOrgCauseChange} required>
              <option value="">----------</option>
              <option value="Animal Welfare">Animal Welfare</option>
              <option value="Arts and Culture">Arts and Culture</option>
              <option value="Children">Children</option>
              <option value="Civil Rights and Social Action">Civil Rights and Social Action</option>
              <option value="Disaster Relief">Disaster Relief</option>
              <option value="Economic Empowerment">Economic Empowerment</option>
              <option value="Education">Education</option>
              <option value="Environment">Environment</option>
              <option value="Health">Health</option>
              <option value="Human Rights">Human Rights</option>
              <option value="Politics">Politics</option>
              <option value="Poverty Alleviation">Poverty Alleviation</option>
              <option value="Science and Technology">Science and Technology</option>
              <option value="Social Services">Social Services</option>
            </select>

            <br/>

            <label className="mt-4">Looking for:</label>
            <div className="looking-for-checkboxes" onChange={onOrgInterestChange}>
              <div><input type="checkbox" value="Members"/> <label>Members</label></div>
              <div><input type="checkbox" value="Partnerships"/> <label>Partnerships</label></div>
              <div><input type="checkbox" value="Sponsors"/> <label>Sponsors</label></div>
              <div><input type="checkbox" value="Clients"/> <label>Clients</label></div>
              <div><input type="checkbox" value="Opportunities"/> <label>Opportunities</label></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <input class="btn btn-info" type="submit" value="Submit your NPO!"/>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}

export default AddNPO;
