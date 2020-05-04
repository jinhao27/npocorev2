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
      if (snapshot.val()) {
        for (let organizationObj of Object.entries(snapshot.val())) {
          tempOrganizations.push(organizationObj[1]);
        }
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

      <div className="organizations mt-5">
        {organizations.map((organization, key) =>
          <div className="organization" key={key}>
            <h3>{organization.name}</h3>
            <div><strong>Gender:</strong> {organization.gender}</div>
            <p>{organization.description}</p>
            <div className="organization-interests">
              {organization.interests.map((interest, key) =>
                <small>{interest}</small>
              )}
            </div>
            <div className="organization-resources">
              <a href="mailto:{organization.email}" target="_">
                <img src="/img/email.svg" alt="" />
              </a>
              <a href={organization.website} target="_">
                <img src="/img/link.svg" alt="" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Organizations;
