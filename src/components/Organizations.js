import React, { useState } from 'react';

// IMPORTS
import firebase from '../firebase.js';


function Organizations() {
  let [organizations, setOrganizations] = useState([]);
  const organizationsRef = firebase.database().ref("organizations"); // FIREBASE

  const getOrganizations = () => {
    let tempOrganizations = [];
    organizationsRef.once("value").then((snapshot) => {
      for (let organizationObj of Object.entries(snapshot.val())) {
        tempOrganizations.push(organizationObj[1]);
      }

      setOrganizations(tempOrganizations);
    });
  }

  getOrganizations(); // GET ALL ORGS ON LOAD

  return (
    <div>
      <h1>Organizations</h1>
      <button onClick={getOrganizations}>Get Organizations</button>

      {organizations.map((organization, key) =>
        <div className="organization" key={key}>
          <h3>{organization.name}</h3>
          <p>{organization.description}</p>
          <small>{organization.email}</small>
        </div>
      )}
    </div>
  )
}

export default Organizations;
