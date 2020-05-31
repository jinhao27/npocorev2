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
        // return response.json();
        return [
{
"interests": null,
"posts": [],
"subscriptions": [],
"_id": "5ed1e2d5f59ad3298c90a5d1",
"name": "test2",
"email": "test2@mail.com",
"description": "test2",
"password": "sha1$9963bd02$1$0ee5886713e0fe3acabdc0f407f01190cc39c64c",
"location": {
"name": "San Francisco, CA, USA"
},
"gender": "Everyone",
"cause": "Arts and Culture",
"npoScore": 84.5,
"bumpedInLastHour": false,
"__v": 0,
"logo": "melodiesformath.png"
},
{
"interests": [],
"posts": [
{
"title": "new post",
"content": "this is a new post\r\n",
"datetimePosted": "2020-05-30T02:31:00.862Z",
"creator": {
"interests": [],
"posts": [],
"subscriptions": [
"calix.huang1@gmail.com"
],
"_id": "5ed1c3154b549a24cb29bd36",
"name": "test",
"email": "test@mail.com",
"description": "test",
"password": "sha1$a9e0b675$1$88e95c5ff5da3b602894388a0b06ebbdefde4010",
"location": {
"name": ""
},
"gender": "Everyone",
"cause": "Arts and Culture",
"npoScore": 52.5,
"bumpedInLastHour": true,
"__v": 0
}
},
{
"title": "a post",
"content": "this is a post",
"datetimePosted": "2020-05-30T02:31:49.423Z",
"creator": {
"interests": [],
"posts": [
{
"title": "new post",
"content": "this is a new post\r\n",
"datetimePosted": "2020-05-30T02:31:00.862Z",
"creator": {
"interests": [],
"posts": [],
"subscriptions": [
"calix.huang1@gmail.com"
],
"_id": "5ed1c3154b549a24cb29bd36",
"name": "test",
"email": "test@mail.com",
"description": "test",
"password": "sha1$a9e0b675$1$88e95c5ff5da3b602894388a0b06ebbdefde4010",
"location": {
"name": ""
},
"gender": "Everyone",
"cause": "Arts and Culture",
"npoScore": 52.5,
"bumpedInLastHour": true,
"__v": 0
}
}
],
"subscriptions": [
"calix.huang1@gmail.com"
],
"_id": "5ed1c3154b549a24cb29bd36",
"name": "test",
"email": "test@mail.com",
"description": "test",
"password": "sha1$a9e0b675$1$88e95c5ff5da3b602894388a0b06ebbdefde4010",
"location": {
"name": ""
},
"gender": "Everyone",
"cause": "Arts and Culture",
"npoScore": 57.75,
"bumpedInLastHour": true,
"__v": 0
}
},
{
"title": "post",
"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
"datetimePosted": "2020-05-30T23:26:20.002Z",
"creator": {
"interests": [],
"posts": [
{
"title": "new post",
"content": "this is a new post\r\n",
"datetimePosted": "2020-05-30T02:31:00.862Z",
"creator": {
"interests": [],
"posts": [],
"subscriptions": [
"calix.huang1@gmail.com"
],
"_id": "5ed1c3154b549a24cb29bd36",
"name": "test",
"email": "test@mail.com",
"description": "test",
"password": "sha1$a9e0b675$1$88e95c5ff5da3b602894388a0b06ebbdefde4010",
"location": {
"name": ""
},
"gender": "Everyone",
"cause": "Arts and Culture",
"npoScore": 52.5,
"bumpedInLastHour": true,
"__v": 0
}
},
{
"title": "a post",
"content": "this is a post",
"datetimePosted": "2020-05-30T02:31:49.423Z",
"creator": {
"interests": [],
"posts": [
{
"title": "new post",
"content": "this is a new post\r\n",
"datetimePosted": "2020-05-30T02:31:00.862Z",
"creator": {
"interests": [],
"posts": [],
"subscriptions": [
"calix.huang1@gmail.com"
],
"_id": "5ed1c3154b549a24cb29bd36",
"name": "test",
"email": "test@mail.com",
"description": "test",
"password": "sha1$a9e0b675$1$88e95c5ff5da3b602894388a0b06ebbdefde4010",
"location": {
"name": ""
},
"gender": "Everyone",
"cause": "Arts and Culture",
"npoScore": 52.5,
"bumpedInLastHour": true,
"__v": 0
}
}
],
"subscriptions": [
"calix.huang1@gmail.com"
],
"_id": "5ed1c3154b549a24cb29bd36",
"name": "test",
"email": "test@mail.com",
"description": "test",
"password": "sha1$a9e0b675$1$88e95c5ff5da3b602894388a0b06ebbdefde4010",
"location": {
"name": ""
},
"gender": "Everyone",
"cause": "Arts and Culture",
"npoScore": 57.75,
"bumpedInLastHour": true,
"__v": 0
}
}
],
"subscriptions": [
"calix.huang1@gmail.com"
],
"_id": "5ed1c3154b549a24cb29bd36",
"name": "test",
"email": "test@mail.com",
"description": "test",
"password": "sha1$a9e0b675$1$88e95c5ff5da3b602894388a0b06ebbdefde4010",
"location": {
"name": ""
},
"gender": "Everyone",
"cause": "Arts and Culture",
"npoScore": 63.525,
"bumpedInLastHour": true,
"verifiedNonprofit": false,
"__v": 0
}
},
{
"title": "sadfd",
"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
"datetimePosted": "2020-05-30T23:26:46.512Z",
"creator": {
"interests": [],
"posts": [
{
"title": "new post",
"content": "this is a new post\r\n",
"datetimePosted": "2020-05-30T02:31:00.862Z",
"creator": {
"interests": [],
"posts": [],
"subscriptions": [
"calix.huang1@gmail.com"
],
"_id": "5ed1c3154b549a24cb29bd36",
"name": "test",
"email": "test@mail.com",
"description": "test",
"password": "sha1$a9e0b675$1$88e95c5ff5da3b602894388a0b06ebbdefde4010",
"location": {
"name": ""
},
"gender": "Everyone",
"cause": "Arts and Culture",
"npoScore": 52.5,
"bumpedInLastHour": true,
"__v": 0
}
},
{
"title": "a post",
"content": "this is a post",
"datetimePosted": "2020-05-30T02:31:49.423Z",
"creator": {
"interests": [],
"posts": [
{
"title": "new post",
"content": "this is a new post\r\n",
"datetimePosted": "2020-05-30T02:31:00.862Z",
"creator": {
"interests": [],
"posts": [],
"subscriptions": [
"calix.huang1@gmail.com"
],
"_id": "5ed1c3154b549a24cb29bd36",
"name": "test",
"email": "test@mail.com",
"description": "test",
"password": "sha1$a9e0b675$1$88e95c5ff5da3b602894388a0b06ebbdefde4010",
"location": {
"name": ""
},
"gender": "Everyone",
"cause": "Arts and Culture",
"npoScore": 52.5,
"bumpedInLastHour": true,
"__v": 0
}
}
],
"subscriptions": [
"calix.huang1@gmail.com"
],
"_id": "5ed1c3154b549a24cb29bd36",
"name": "test",
"email": "test@mail.com",
"description": "test",
"password": "sha1$a9e0b675$1$88e95c5ff5da3b602894388a0b06ebbdefde4010",
"location": {
"name": ""
},
"gender": "Everyone",
"cause": "Arts and Culture",
"npoScore": 57.75,
"bumpedInLastHour": true,
"__v": 0
}
}
],
"subscriptions": [
"calix.huang1@gmail.com"
],
"_id": "5ed1c3154b549a24cb29bd36",
"name": "test",
"email": "test@mail.com",
"description": "test",
"password": "sha1$a9e0b675$1$88e95c5ff5da3b602894388a0b06ebbdefde4010",
"location": {
"name": ""
},
"gender": "Everyone",
"cause": "Arts and Culture",
"npoScore": 63.525,
"bumpedInLastHour": true,
"verifiedNonprofit": false,
"__v": 0
}
}
],
"subscriptions": [
"calix.huang1@gmail.com"
],
"_id": "5ed1c3154b549a24cb29bd36",
"name": "test",
"email": "test@mail.com",
"description": "test",
"password": "sha1$a9e0b675$1$88e95c5ff5da3b602894388a0b06ebbdefde4010",
"location": {
"name": ""
},
"gender": "Everyone",
"cause": "Arts and Culture",
"npoScore": 69.8775,
"bumpedInLastHour": true,
"verifiedNonprofit": false,
"__v": 0
},
{
"interests": [],
"posts": [],
"subscriptions": [],
"_id": "5ed1e2e8f59ad3298c90a5d2",
"name": "test3",
"email": "test3@mail.com",
"description": "test3",
"password": "sha1$4953804f$1$3f7c1c6e47dcb64f0831a6d1ca66a1332ba250d2",
"location": {
"name": ""
},
"gender": "Everyone",
"cause": "Animal Welfare",
"npoScore": 50,
"bumpedInLastHour": false,
"__v": 0
},
{
"interests": [],
"posts": [],
"subscriptions": [],
"_id": "5ed1e319e55c552996187fcc",
"name": "test4",
"email": "test4@mail.com",
"description": "test4",
"password": "sha1$0cee834f$1$7f49da34badcc852f1ff69290965cd11406e4dc9",
"location": {
"name": ""
},
"gender": "Male",
"cause": "Arts and Culture",
"npoScore": 50,
"bumpedInLastHour": false,
"__v": 0
},
{
"interests": [],
"posts": [],
"subscriptions": [],
"_id": "5ed1e36e8b552a29a6b2577d",
"name": "test5",
"email": "test5@mail.com",
"description": "test5",
"password": "sha1$4b7faffc$1$a3458c30765113a4e0e08a267284f4361677880a",
"location": {
"name": ""
},
"gender": "Male",
"cause": "Animal Welfare",
"npoScore": 50,
"bumpedInLastHour": false,
"__v": 0
}
];
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
              <div style={{ height: "50px" }} className="image-cropper">
                {organization.logo ?
                  <img src={"http://localhost:3000/static/media/logos/" + organization.logo} alt="" />
                  :
                  <img src="http://localhost:3000/static/img/no-logo.png" alt="" />
                }
              </div>
              <div>
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
