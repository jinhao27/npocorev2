import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Organizations() {
  const [baseOrganizations, setBaseOrganizations] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [featuredOrganizations, setFeaturedOrganizations] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // FILTERS
  const [filterSearchText, setFilterSearchText] = useState("");
  const [filterTargetAudience, setFilterTargetAudience] = useState("");
  const [filterCause, setFilterCause] = useState("");
  const [filterInterest, setFilterInterest] = useState("");

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
        // return response.json();
        return [
{
"interests": [
"Members",
"Partnerships",
"Sponsors"
],
"posts": [
{
"_id": "5ed331fe13e8584d2aca92de",
"title": "test post",
"content": "this is a test post",
"datetimePosted": "2020-05-31T04:26:38.575Z",
"creator": {
"interests": [
"Members",
"Partnerships",
"Sponsors"
],
"posts": [],
"subscriptions": [],
"_id": "5ed3315e11ee614d09be2c43",
"name": "Test Organization",
"email": "calix.huang1@gmail.com",
"description": "This is a test organization for NPO Core! We focus on being a fake organization because we truly believe in testing NPO Core! Our mission is to test NPO Core and get deleted immediately after launch because we don't really exist or serve any other purpose than to test NPO Core!",
"password": "sha1$4d3f9e39$1$3a10b3d67dfcfa3f247e197cc0f36afcf3a9b668",
"location": {
"name": ""
},
"gender": "Everyone",
"cause": "Science and Technology",
"logo": "ig-profile-pic.png",
"npoScore": 55,
"bumpedInLastHour": false,
"__v": 0
}
}
],
"subscriptions": [],
"_id": "5ed3315e11ee614d09be2c43",
"verifiedNonprofit": true,
"idName": "test-organization",
"featured": true,
"links": {
"instagram": "https://instagram.com/test-organization",
"facebook": "https://facebook.com/test-organization",
"twitter": "https://twitter.com/test-organization",
"linkedin": "https://linkedin.com/test-organization",
"website": "https://testorganization.com"
},
"name": "Test Organization",
"email": "calix.huang1@gmail.com",
"description": "This is a test organization for NPO Core! We focus on being a fake organization because we truly believe in testing NPO Core! Our mission is to test NPO Core and get deleted immediately after launch because we don't really exist or serve any other purpose than to test NPO Core!",
"password": "sha1$4d3f9e39$1$3a10b3d67dfcfa3f247e197cc0f36afcf3a9b668",
"location": {
"name": ""
},
"targetAudience": "Everyone",
"cause": "Science and Technology",
"logo": "ig-profile-pic.png",
"npoScore": 65.04544838343112,
"bumpedInLastHour": true,
"__v": 0
},
{
"interests": null,
"posts": [],
"subscriptions": [],
"_id": "5ed59835aca3c4154290fe34",
"name": "test",
"email": "test@mail.com",
"description": "test",
"password": "sha1$464aa5a4$1$737e04ea5bddf67423284cdeff389406cb693c52",
"location": {
"name": ""
},
"targetAudience": "Kids",
"cause": "Emergency and Safety",
"idName": "test",
"npoScore": 50,
"bumpedInLastHour": false,
"__v": 0,
"links": {
"instagram": "https://github.com/launchtechllc/npocore/releases/tag/v1.16.2",
"facebook": "https://github.com/launchtechllc/npocore/releases/tag/v1.16.2",
"twitter": "https://github.com/launchtechllc/npocore/releases/tag/v1.16.2",
"linkedin": "https://github.com/launchtechllc/npocore/releases/tag/v1.16.2"
}
}
];
      })
      .then((organizations) => {
        setOrganizations(organizations);
        setBaseOrganizations(organizations);

        // GETTING FEATURED ORGANIZATIONS
        const featuredOrganizationsArray = organizations.filter(organization => organization.featured == true);
        setFeaturedOrganizations(featuredOrganizationsArray);
      })
      .catch((err) => {
          console.log("Exception:", err);
      });
  }

  useEffect(() => {
    getOrganizations(); // GET ALL ORGS ON LOAD
  }, []);

  useEffect(() => {
    filterPipeline();
  }, [filterSearchText, filterTargetAudience, filterCause, filterInterest]);

  // FILTERING FUNCTIONS
  const filterPipeline = () => {
    let filteredOrganizations = baseOrganizations;

    filteredOrganizations = filterOrganizationsBySearch(filteredOrganizations);
    filteredOrganizations = filterOrganizationsByTargetAudience(filteredOrganizations);
    filteredOrganizations = filterOrganizationsByCause(filteredOrganizations);
    filteredOrganizations = filterOrganizationsByInterest(filteredOrganizations);

    setOrganizations(filteredOrganizations);
  }

  const filterOrganizationsBySearch = (organizationsToFilter) => {
    const currentSearchText = filterSearchText.toLowerCase();

    if (currentSearchText === "") {
      return organizationsToFilter;
    } else {
      // FILTERING ORGANIZATIONS BY LOWERCASE SEARCH FILTER
      return organizationsToFilter.filter(organization => organization.name.toLowerCase().includes(currentSearchText));;
    }
  }

  const filterOrganizationsByTargetAudience = (organizationsToFilter) => {
    if (filterTargetAudience) {
      return organizationsToFilter.filter(organization => organization.targetAudience === filterTargetAudience);
    } else {
      return organizationsToFilter;
    }
  }

  const filterOrganizationsByCause = (organizationsToFilter) => {
    if (filterCause) {
      return organizationsToFilter.filter(organization => organization.cause === filterCause);
    } else {
      return organizationsToFilter;
    }
  }

  const filterOrganizationsByInterest = (organizationsToFilter) => {
    if (filterInterest) {
      return organizationsToFilter.filter(organization => {
        if (organization.interests) {
          return organization.interests.includes(filterInterest)
        } else {
          return false;
        }
      });
    } else {
      return organizationsToFilter;
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
        <title>NPO Core - Nonprofit Organizations</title>
        <meta name="description" content="Look at our huge, curated list of nonprofit organizations that we've built up! Find a nonprofit organization to join, partner with, or simply get in contact with here on NPO Core!" />
      </Helmet>
      <div className="pb-5">
        <div className="options">
          <h1 className="mt-4">Organizations</h1>
          <a class="solid-cta-button" href="/organizations/map">Check out our organization map!</a>
        </div>

        {featuredOrganizations.length ?
          <h3>Featured Organizations</h3>
          :
          <span></span>
        }
        <div className="organizations mt-5">
          {featuredOrganizations ? featuredOrganizations.map((organization, key) =>
            <div className="organization" key={key}>
              <div className="image-cropper-container">
                <div style={{ height: "50px" }} className="image-cropper">
                  {organization.logo ?
                    <img src={"/static/media/logos/" + organization.logo} alt="" />
                    :
                    <img src="/static/img/no-logo.png" alt="" />
                  }
                </div>
                {organization.verifiedNonprofit ?
                  <img class="nonprofit-badge" src="/static/img/icons/501c3.svg" alt=""/>
                  :
                  <span></span>
                }
              </div>
              <div>
                <div className="organization-header">
                  <h4>{organization.name}</h4>
                  <div className="organization-resources">
                    <a href="mailto:{organization.email}" target="_">
                      {organization.email ? <img src="/img/email.svg" alt="{organization.name} Email Address" /> : null}
                    </a>
                    <a href={"/@" + organization.idName}>
                      <img style={{transform: "translateY(-2px)"}} src="/img/link.svg" alt="{organization.name}" />
                    </a>
                  </div>
                </div>
                {organization.location.name ? <div><strong>Location:</strong> {organization.location.name}</div> : <span></span>}
                <div><strong>Target Audience:</strong> {organization.targetAudience}</div>
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
            </div>
          ) :
          <div className="text-center">
            <small>No organizations yet!</small>
          </div>
        }
        </div>

        <div className="mt-4 text-right">
          {showFilters ?
            <button class="toggle-filter" onClick={toggleFilters}>Filters &uarr;</button>
            :
            <button class="toggle-filter" onClick={toggleFilters}>Filters &darr;</button>
          }
        </div>

        {showFilters ?
          <div className="filters mt-3">
            <input className="form-control search-bar" type="text" placeholder="Filter" onChange={event => setFilterSearchText(event.target.value)} />

            <select onChange={event => setFilterTargetAudience(event.target.value)} required>
              <option value="">Target Audience</option>
              <option value="Everyone">Everyone</option>
              <option value="Kids">Kids</option>
              <option value="Teens">Teens</option>
              <option value="Adults">Adults</option>
              <option value="Seniors">Seniors</option>
              <option value="Groups">Groups</option>
            </select>

            <select onChange={event => setFilterCause(event.target.value)} required>
              <option value="">Cause</option>
              <option value="Advocacy and Human Rights">Advocacy and Human Rights</option>
              <option value="Animal Welfare">Animal Welfare</option>
              <option value="Arts and Culture">Arts and Culture</option>
              <option value="Children and Youth">Children and Youth</option>
              <option value="Civil Rights and Social Action">Civil Rights and Social Action</option>
              <option value="Crisis Support">Crisis Support</option>
              <option value="Disaster Relief">Disaster Relief</option>
              <option value="Emergency and Safety">Emergency and Safety</option>
              <option value="Education">Education</option>
              <option value="Environment">Environment</option>
              <option value="Female Empowerment">Female Empowerment</option>
              <option value="Health">Health</option>
              <option value="Homeless and Housing">Homeless and Housing</option>
              <option value="Politics">Politics</option>
              <option value="LGBTQ+">LGBTQ+</option>
              <option value="Race and Ethnicity">Race and Ethnicity</option>
              <option value="Poverty Alleviation">Poverty Alleviation</option>
              <option value="Science and Technology">Science and Technology</option>
              <option value="Social Services">Social Services</option>
              <option value="Veterans and Military Families">Veterans and Military Families</option>
            </select>

            <select onChange={event => setFilterInterest(event.target.value)} required>
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
              <div className="image-cropper-container">
                <div style={{ height: "50px" }} className="image-cropper">
                  {organization.logo ?
                    <img src={"/static/media/logos/" + organization.logo} alt="" />
                    :
                    <img src="/static/img/no-logo.png" alt="" />
                  }
                </div>
                {organization.verifiedNonprofit ?
                  <img class="nonprofit-badge" src="/static/img/icons/501c3.svg" alt=""/>
                  :
                  <span></span>
                }
              </div>
              <div>
                <div className="organization-header">
                  <h4>{organization.name}</h4>
                  <div className="organization-resources">
                    <a href="mailto:{organization.email}" target="_">
                      {organization.email ? <img src="/img/email.svg" alt="{organization.name} Email Address" /> : null}
                    </a>
                    <a href={"/@" + organization.idName}>
                      <img style={{transform: "translateY(-2px)"}} src="/img/link.svg" alt="{organization.name}" />
                    </a>
                  </div>
                </div>
                {organization.location.name ? <div><strong>Location:</strong> {organization.location.name}</div> : <span></span>}
                <div><strong>Target Audience:</strong> {organization.targetAudience}</div>
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
