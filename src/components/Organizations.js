import React, { useState, useEffect } from 'react';

// IMPORTS
import firebase from '../firebase.js';


function Organizations() {
  const organizationsRef = firebase.database().ref("organizations"); // FIREBASE
  const [baseOrganizations, setBaseOrganizations] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  // FILTERING VARIABLES
  const [searchText, setSearchText] = useState("");

  const getOrganizations = () => {
    let tempOrganizations = [];
    organizationsRef.once("value").then((snapshot) => {
      for (let organizationObj of Object.entries(snapshot.val())) {
        tempOrganizations.push(organizationObj[1]);
      }

      setOrganizations(tempOrganizations);
      setBaseOrganizations(tempOrganizations);
    });
  }

  useEffect(() => {
      getOrganizations(); // GET ALL ORGS ON LOAD
  }, []);

  // FILTERING FUNCTIONS
  const filterOrganizationsBySearch = (event) => {
    const currentSearchText = event.target.value;

    // SETTING SEARCH TEXT
    setSearchText(currentSearchText);

    if (currentSearchText == "") {
      getOrganizations();
    } else {
      // FILTERING ORGANIZATIONS
      const filteredOrganizations = baseOrganizations.filter(organization => organization.name.includes(currentSearchText));
      setOrganizations(filteredOrganizations);
    }
  }

  return (
    <div>
      <h1>Organizations</h1>
      <button onClick={getOrganizations}>Get Organizations</button>

      <input type="text" placeholder="Filter" onChange={filterOrganizationsBySearch} />

      <div className="organizations">
        {organizations.map((organization, key) =>
          <div className="organization" key={key}>
            <h3>{organization.name}</h3>
            <p>{organization.description}</p>
            <small>{organization.email}</small>
          </div>
        )}
      </div>
    </div>
  )
}

export default Organizations;
