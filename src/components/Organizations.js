import React, { useState, useEffect } from 'react';

// IMPORTS
import firebase from '../firebase.js';


function Organizations() {
  const organizationsRef = firebase.database().ref("organizations"); // FIREBASE
  const [baseOrganizations, setBaseOrganizations] = useState([]);
  const [organizations, setOrganizations] = useState([]);

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
    const currentSearchText = event.target.value.toLowerCase();

    if (currentSearchText === "") {
      getOrganizations();
    } else {
      // FILTERING ORGANIZATIONS BY LOWERCASE SEARCH FILTER
      const filteredOrganizations = baseOrganizations.filter(organization => organization.name.toLowerCase().includes(currentSearchText));
      setOrganizations(filteredOrganizations);
    }
  }

  const filterOrganizationsByGender = (event) => {
    const genderValue = event.target.value;

    if (genderValue) {
      setOrganizations(baseOrganizations.filter(organization => organization.gender === genderValue));
    } else {
      getOrganizations();
    }
  }

  const filterOrganizationsByCause = (event) => {
    const causeValue = event.target.value;

    if (causeValue) {
      setOrganizations(baseOrganizations.filter(organization => organization.cause === causeValue));
    } else {
      getOrganizations();
    }
  }

  const filterOrganizationsByInterest = (event) => {
    const interestValue = event.target.value;

    if (interestValue) {
      setOrganizations(baseOrganizations.filter(organization => {
        return organization.interests.includes(interestValue)
      }));
    } else {
      getOrganizations();
    }
  }

  const readMore = (event) => {
    const readMoreButton = event.target;
    readMoreButton.parentNode.style.display = "none";
    readMoreButton.parentNode.parentNode.parentNode.querySelector("p").className = "";
  }

  return (
    <div className="pb-5">
      <h1 className="">Organizations</h1>

      <div className="filters mt-3">
        <input className="form-control search-bar" type="text" placeholder="Filter" onChange={filterOrganizationsBySearch} />

        <select onChange={filterOrganizationsByGender} required>
          <option value="">Gender</option>
          <option value="Everyone">Everyone</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
        </select>

        <select onChange={filterOrganizationsByCause} required>
          <option value="">Cause</option>
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

        <select onChange={filterOrganizationsByInterest} required>
          <option value="">Interest</option>
          <option value="Members">Members</option>
          <option value="Partnerships">Partnerships</option>
          <option value="Sponsors">Sponsors</option>
          <option value="Clients">Clients</option>
          <option value="Opportunities">Opportunities</option>
        </select>

        <button class="refresh-organizations" onClick={getOrganizations}>
          <img src="/img/refresh.svg" alt=""/>
        </button>
      </div>

      <div className="organizations mt-5">
        {organizations.map((organization, key) =>
          <div className="organization" key={key}>
            <div className="organization-header">
              <h5>{organization.name}</h5>
              <div className="organization-resources">
                <a href="mailto:{organization.email}" target="_">
                  <img src="/img/email.svg" alt="" />
                </a>
                <a href={organization.website} target="_">
                  <img src="/img/link.svg" alt="" />
                </a>
              </div>
            </div>
            <div><strong>Gender:</strong> {organization.gender}</div>
            <div><strong>Cause:</strong> {organization.cause}</div>
            <p className="organization-description"><strong>Description:</strong> {organization.description}</p>
            <div className="text-right mb-2">
              <button className="btn btn-link p-0" onClick={readMore}>
                <small>Read More</small>
              </button>
            </div>
            <div className="organization-interests">
              {(organization.interests || []).map((interest, key) =>
                <small>{interest}</small>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Organizations;
