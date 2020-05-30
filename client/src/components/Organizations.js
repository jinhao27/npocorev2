import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Organizations() {
  const [baseOrganizations, setBaseOrganizations] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const getOrganizations = async () => {
    // SAVE MONGODB ORGS TO PROPS
    fetch("/api/get-organizations",{
        method: 'GET',
        mode: "no-cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json"}
      })
      .then((response) => {
        return response.json();
      })
      .then((organizations) => {
        setOrganizations(organizations);
        setBaseOrganizations(organizations);
      })
      .catch((err) => {
          console.log("Exception:", err);
      });
  }

  useEffect(() => {
    document.title = "NPO Core - Organizations"; // Setting title
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


  const toggleFilters = (event) => {
    if (showFilters) {
      setShowFilters(false);
    } else {
      setShowFilters(true);
    }
  }

  return (
    <div>
      <Helmet>
        <title>NPO Core - A List of Nonprofit Organizations for High School & College Students</title>
        <meta name="description" content="Look at our huge, curated list of nonprofit organizations that we've built up! Find a nonprofit organization to join, partner with, or simply get in contact with here on NPO Core!" />
      </Helmet>
      <div className="pb-5">
        <h1 className="mt-4">Organizations</h1>
        <small>
          If you would like your nonprofit organization removed from NPO Core, please <a href="/contact">contact us</a>.
        </small>

        <br/>

        {showFilters ?
          <button onClick={toggleFilters}>Filters &uarr;</button>
          :
          <button onClick={toggleFilters}>Filters &darr;</button>
        }

        {showFilters ?
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
          </div>
          :
          <span></span>
        }

        <div className="organizations mt-5">
          {organizations ? organizations.map((organization, key) =>
            <div className="organization" key={key}>
              <div className="organization-header">
                <h4>{organization.name}</h4>
                <div className="organization-resources">
                  <a href="mailto:{organization.email}" target="_">
                    {organization.email ? <img src="/img/email.svg" alt="{organization.name} Email Address" /> : null}
                  </a>
                  <a href={"/organizations/" + organization._id}>
                    <img style={{transform: "translateY(-2px)"}} src="/img/link.svg" alt="{organization.name}" />
                  </a>
                </div>
              </div>
              {organization.location.name ? <div><strong>Location:</strong> {organization.location.name}</div> : <span></span>}
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
          ) :
          <div className="text-center">
            <small>No organizations yet!</small>
          </div>
        }
        </div>
      </div>
    </div>
  )
}

export default Organizations;
