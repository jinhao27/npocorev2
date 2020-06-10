import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Organizations() {
  const [basePosts, setBasePosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // FILTERS
  const [filterTitleSearchText, setFilterTitleSearchText] = useState("");
  const [filterContentSearchText, setFilterContentSearchText] = useState("");
  const [filterType, setFilterType] = useState("");

  const getOrganizations = async () => {
    // SAVE MONGODB ORGS TO PROPS
    fetch("/api/get-posts",{
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
"causes": [
"Advocacy and Human Rights",
"Animal Welfare"
],
"targetAudiences": [
"Teens"
],
"interests": [
"Partnerships",
"Sponsors",
"Clients"
],
"posts": [
{
"_id": "5ee085d81221757a525dc3fb",
"title": "test",
"content": "test",
"datetimePosted": "2020-06-10T07:03:52.988Z",
"creator": {
"causes": [
"Advocacy and Human Rights",
"Animal Welfare"
],
"targetAudiences": [
"Teens"
],
"interests": [
"Partnerships",
"Sponsors",
"Clients"
],
"subscriptions": [],
"_id": "5edfcc68bacc39467d54ebc2",
"name": "test2",
"email": "test2@mail.com",
"description": "test2",
"password": "sha1$56554a04$1$34756d649addc4c6ca40983fabd3c810f72c8b21",
"location": {
"name": ""
},
"idName": "test2",
"npoScore": 56.2754405,
"bumpedInLastHour": false,
"__v": 0
},
"button": {
"text": "test",
"link": "https://www.launchtechllc.com/",
"color": "#f28c41"
},
"type": "Event"
}
],
"subscriptions": [],
"_id": "5edfcc68bacc39467d54ebc2",
"name": "test2",
"email": "test2@mail.com",
"description": "test2",
"password": "sha1$56554a04$1$34756d649addc4c6ca40983fabd3c810f72c8b21",
"location": {
"name": ""
},
"idName": "test2",
"npoScore": 57.963703715,
"bumpedInLastHour": false,
"__v": 0
},
{
"causes": [],
"targetAudiences": [],
"interests": [
"Sponsors",
"Opportunities"
],
"posts": [],
"subscriptions": [],
"_id": "5edfcc4fbacc39467d54ebc1",
"name": "test",
"email": "test@mail.com",
"description": "test",
"password": "sha1$82184bf9$1$e7427694bbb0456add075cf1854d944d61c61b45",
"location": {
"name": ""
},
"idName": "test",
"npoScore": 50,
"bumpedInLastHour": false,
"__v": 0
}
];
      })
      .then((posts) => {
        setPosts(posts);
        setBasePosts(posts);

        // GETTING FEATURED ORGANIZATIONS
        const featuredPostsArray = posts.filter(post => post.featured == true);
        setFeaturedPosts(featuredPostsArray);
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
  }, [filterTitleSearchText, filterContentSearchText, filterType]);

  // FILTERING FUNCTIONS
  const filterPipeline = () => {
    let filteredPosts = basePosts;

    filteredPosts = filterPostsByTitleSearch(filteredPosts);
    filteredPosts = filterPostsByContentSearch(filteredPosts);
    filteredPosts = filterPostsByType(filteredPosts);

    setPosts(filteredPosts);
  }

  const filterPostsByTitleSearch = (postsToFilter) => {
    const currentTitleSearchText = filterTitleSearchText.toLowerCase();

    if (currentTitleSearchText === "") {
      return postsToFilter;
    } else {
      // FILTERING ORGANIZATIONS BY LOWERCASE SEARCH FILTER
      return postsToFilter.filter(post => post.title.toLowerCase().includes(currentTitleSearchText));
    }
  }

  const filterPostsByContentSearch = (postsToFilter) => {
    const currentContentSearchText = filterContentSearchText.toLowerCase();

    if (currentContentSearchText === "") {
      return postsToFilter;
    } else {
      // FILTERING ORGANIZATIONS BY LOWERCASE SEARCH FILTER
      return postsToFilter.filter(post => post.content.toLowerCase().includes(currentContentSearchText));
    }
  }

  const filterPostsByType = (postsToFilter) => {
    if (filterType) {
      return postsToFilter.filter(post => post.type.includes(filterType));
    } else {
      return postsToFilter;
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
        <title>NPO Core - Nonprofit Organization Opportunity Posts - Opportunities for everyone!</title>
      </Helmet>
      <div className="pb-5">
        {featuredPosts.length ?
          <h3>Featured Opportunity Posts</h3>
          :
          <span></span>
        }
        <div className="organizations mt-5">
          {featuredPosts ? featuredPosts.map((organization, key) =>
            <div className="organization" key={key}>
              <div className="image-cropper-container">
                <div style={{ height: "50px" }} className="image-cropper">
                  {organization.logo ?
                    <img src={"https://npocore.s3-us-west-2.amazonaws.com/" + organization.logo} alt="" />
                    :
                    <img src="/static/img/no-logo.png" alt="" />
                  }
                </div>
                {organization.verifiedNonprofit ?
                  <img className="nonprofit-badge" src="/static/img/icons/501c3.svg" alt=""/>
                  :
                  <span></span>
                }
              </div>
              <div>
                <div className="organization-header">
                  <h4><a href={"/@" + organization.idName}>{organization.name}</a></h4>
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
            <small>No featured organizations yet!</small>
          </div>
        }
        </div>

        <div className="mt-4 text-right">
          {showFilters ?
            <button className="toggle-filter" onClick={toggleFilters}>Filters &uarr;</button>
            :
            <button className="toggle-filter" onClick={toggleFilters}>Filters &darr;</button>
          }
        </div>

        {showFilters ?
          <div className="filters mt-3">
            <input className="form-control search-bar" type="text" placeholder="Filter by Title" onChange={event => setFilterTitleSearchText(event.target.value)} />

            <input className="form-control search-bar" type="text" placeholder="Filter by Content" onChange={event => setFilterContentSearchText(event.target.value)} />

            <select onChange={event => setFilterType(event.target.value)} required>
              <option value="">All Target Audiences</option>
              <option value="Announcement">Announcement</option>
              <option value="Event">Event</option>
              <option value="Opportunity">Opportunity</option>
              <option value="Job Opening">Job Opening</option>
            </select>
          </div>
          :
          <span></span>
        }

        <div className="organizations mt-5">
          {posts ? posts.map((post, key) =>
            <div class="post" key={key}>
              {post.image ?
                <img class="post-image" src={s3Link + post.image} alt=""/>
                :
                <span></span>
              }
              <div class="p-3">
                <h3>{post.title}</h3>
                <strong>By: <a href={"/@" + post.creator.idName}>{post.creator.name}</a></strong>
                <br/>
                <small>Posted: {post.datetimePosted.toLocaleDateString("en-US")}</small>
                <p class="post-content mt-3">{post.content}</p>
                <div class="text-right">
                  <button id={post._id} class="btn btn-link p-0" onClick="readMore(this.id)">
                    <small>Read More</small>
                  </button>
                </div>
                <p><small class="type">{post.type}</small></p>
                <a style={{ "background-color": post.button.color, "border-color": post.button.color }} class="solid-cta-button" href={post.button.link} target="_blank">{post.button.text}</a>
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
