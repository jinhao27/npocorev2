const fs = require("fs");
const path = require("path");
const express = require("express");
const fileupload = require("express-fileupload");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const passwordHash = require('password-hash');
const mutilpart = require('connect-multiparty');
const uploader = require('express-fileuploader');
const S3Strategy = require('express-fileuploader-s3');
const AWS = require('aws-sdk');
const { sendEmail } = require("./helper-functions");
const { organizationModel, postModel, passwordResetSessionModel } = require("./models");
const { hourlyBump, postBump, featureBump, referralBump, hourlyDownBump, downBumpOrganizations } = require("./nposcore-functions");

app = express();

// Configuring cookie parser with express
app.use(cookieParser())

// Setting JSON parsing methods for POST request data
app.use(express.urlencoded()); // HTML forms
app.use(express.json()); // API clients
app.use(fileupload()); // FILES

// AWS S3 CONFIGURATION
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const s3Link = "https://npocore.s3-us-west-2.amazonaws.com/";

const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey
});

const uploadFile = (file) => {
    const params = {
        Bucket: "npocore",
        Key: file.name,
        Body: file.data
    };
    s3.upload(params, (err, data) => { if (err) throw err; });
};

// Setting view rendering engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/static'))
app.engine('html', require('ejs').renderFile);

// Mongoose configuration
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/npocore";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
mongoose.set('useFindAndModify', false);

// GLOBAL VARIABLES
const googleApiKey = process.env.GOOGLE_API_KEY;

// INITALIZING ALL BLOCK ELEMENTS
let blockElementsNames = ["imports", "navbar"];
let blockElements = [];
for (var i = 0; i < blockElementsNames.length; i++) {
  fs.readFile(__dirname + `/views/blocks/${blockElementsNames[i]}.html`, "utf-8", (err, data) => {
    if (err) throw err;

    blockElements.push(data);
  });
}

app.use(async (err, req, res, next) => {
  if (req.cookies.organization) {
    // RESETTING COOKIES
    const organization = await organizationModel.findOne({ _id: req.cookies.organization._id });
    
    // REMOVING POSTS FROM COOKIES TO AVOID STORAGE OVERLOAD
    organization.posts = undefined;
    res.cookie("organization", organization);
  }

  next();
})

app.get("/", (req, res) => {
  res.render("index.html", context={ blockElements, cookies: req.cookies, s3Link });
});

app.get("/contact", (req, res) => {
  res.render("contact.html", context={ blockElements, cookies: req.cookies, s3Link });
});

app.get("/posts", async (req, res) => {
  const posts = await postModel.find({}).sort({ datetimePosted: -1 });

  let featured = {};
  featured.organizations = await organizationModel.find({ featured: true });
  featured.posts = await postModel.find({ featured: true });

  res.render("posts.html", context={ blockElements, cookies: req.cookies, s3Link, posts, featured });
});

app.get("/posts/:id", async (req, res) => {
  const post = await postModel.findOne({ _id: req.params.id });
  if (post) {
    res.render("post.html", context={ blockElements, cookies: req.cookies, s3Link, post });
  } else {
    res.render("errors/post.html", context={ blockElements, cookies: req.cookies, s3Link, post });
  }
});

app.route("/register")
  .get((req, res) => {
    res.render("register.html", context={ blockElements, cookies: req.cookies, s3Link, googleApiKey, error: "" });
  })
  .post(async (req, res) => {
    const data = req.body;

    // GET LOCATION COORDINATES
    let location = { name: req.body.location };
    if (req.body.location) {
      const locationJson = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.location}&key=${googleApiKey}`);
      if (locationJson.data.results[0]) {
        location = {
          name: req.body.location,
          lat: locationJson.data.results[0].geometry.location.lat,
          lng: locationJson.data.results[0].geometry.location.lng
        }
      }
    }
    data.location = location;

    // SAVING LOGO IF EXISTS
    if (req.files) {
      const logo = req.files.logo;
      if (logo) {
        uploadFile(logo); // UPLOAD TO S3
        data.logo = logo.name;
      }
    }

    // GENERATING IDNAME
    data.idName = req.body.name.toLowerCase().replace(" ", "-");

    // HANDLING REFERRER (IF EXISTS)
    const referrer = req.body.referrer;
    if (referrer) {
      const organization = await organizationModel.findOne({ name: referrer });
      if (organization) {
        organizationModel.findOneAndUpdate(
          { name: referrer },
          { npoScore: referralBump(organization.npoScore) },
          { new: true },
          (err, organization) => {
            if (err) throw err;

            sendEmail("NPO Core - Someone referred you!", organization.email, `${data.name} just referred you when registering! Go check it out!`);
          }
        )
      } else {
        res.send("That referrer doesn't exist!");
      }
    }

    // HANDLING SOCIAL LINKS
    let links = {};
    if (req.body.instagram) {
      links.instagram = req.body.instagram;
    }
    if (req.body.facebook) {
      links.facebook = req.body.facebook;
    }
    if (req.body.twitter) {
      links.twitter = req.body.twitter;
    }
    if (req.body.linkedin) {
      links.linkedin = req.body.linkedin;
    }
    if (req.body.website) {
      links.website = req.body.website;
    }
    data.links = links;

    // HASHING PASSWORD
    data.password = passwordHash.generate(req.body.password);

    // ADDING NPO SCORE
    data.npoScore = 50;
    data.bumpedInLastHour = false;

    const newOrganization = new organizationModel(data);
    newOrganization.save((err, organization) => {
      if (err) {
        res.render("register.html", context={ blockElements, cookies: req.cookies, s3Link, googleApiKey, error: "That organization name/email already exists. Please use a different one." });
      } else {
        res.cookie("organization", newOrganization);
        res.redirect(`/@${newOrganization.idName}`);
      }
    });
  });

app.route("/login")
  .get((req, res) => {
    res.render("login.html", context={ blockElements, cookies: req.cookies, s3Link, error: "" });
  })
  .post(async (req, res) => {
    const organization = await organizationModel.findOne({ email: req.body.email });

    if (organization) {
      if (passwordHash.verify(req.body.password, organization.password)) {
        // REMOVING POSTS FROM COOKIES TO AVOID STORAGE OVERLOAD
        organization.posts = undefined;
        res.cookie("organization", organization);
        res.redirect(`/@${organization.idName}`);
      } else {
        res.render("login.html", context={ blockElements, cookies: req.cookies, s3Link, error: "Invalid credentials." });
      }
    } else {
      res.render("login.html", context={ blockElements, cookies: req.cookies, s3Link, error: "Invalid credentials." });
    }
  });

app.get("/logout", (req, res) => {
  res.clearCookie("organization");
  res.redirect("/");
});

app.get("/organizations/map", async (req, res) => {
  const organizations = await organizationModel.find({});
  res.render("map.html", context={ blockElements, cookies: req.cookies, s3Link, organizations, googleApiKey });
});

app.route("/@:idName")
  .get((req, res) => {
    organizationModel.findOne({ idName: req.params.idName }, (err, organization) => {
      if (err) {
        res.render("errors/organization.html", context={ blockElements, cookies: req.cookies, s3Link });
        return;
      }

      if (organization) {
        res.render("organization.html", context={ blockElements, cookies: req.cookies, s3Link, organization });
      } else {
        res.render("errors/organization.html", context={ blockElements, cookies: req.cookies, s3Link });
      }
    });
  })
  .post(async (req, res) => {
    const email = req.body.email;
    const organizationIdName = req.params.idName;

    const organization = await organizationModel.findOne({ idName: organizationIdName });
    if (!organization.subscriptions.includes(email)) {
      organizationModel.findOneAndUpdate(
        { _id: organizationIdName },
        { $push: { subscriptions: email } },
        { new: true },
        (err, organization) => {
          if (err) throw err;
        }
      )
    }

    res.redirect(`/@${organization.idName}`);
  })

app.route("/@:idName/post")
  .get((req, res) => {
    // MAKE SURE USER IS LOGGED INTO THIS ORG
    if (req.cookies.organization && req.params.idName == req.cookies.organization.idName) {
      res.render("make-post.html", context={ blockElements, cookies: req.cookies, s3Link });
    } else {
      res.render("errors/permission.html", context={ blockElements, cookies: req.cookies, s3Link });
    }
  })
  .post((req, res) => {
    // MAKE SURE USER IS LOGGED INTO THIS ORG
    if (req.cookies.organization && req.params.idName == req.cookies.organization.idName) {
      // CREATE POST
      const post = {
        title: req.body.title,
        content: req.body.content,
        datetimePosted: new Date(),
        creator: req.cookies.organization
      };
      const newPost = new postModel(post);
      newPost.save((err) => { if (err) throw err; });

      // BUMPING NPO SCORE + ADDING POST
      organizationModel.findOneAndUpdate(
        { _id: req.cookies.organization._id },
        { $push: { posts: newPost }, npoScore: postBump(req.cookies.organization.npoScore) },
        { new: true },
        (err, organization) => {
          if (err) throw err;

          // NOTIFY ALL SUBSCRIPTIONS
          if (organization.subscriptions) {
            for (email of organization.subscriptions) {
              sendEmail(`NPO Core - New post from ${organization.name}`, email, `Check out ${organization.name}'s newest post on NPO Core!\n\nhttp://${req.get("host")}/posts/${newPost._id}`);
            }
          }
        }
      )

      res.redirect("/posts");
    } else {
      res.render("errors/permission.html", context={ blockElements, cookies: req.cookies, s3Link });
    }
  });

app.route("/@:idName/update")
  .get(async (req, res) => {
    // MAKE SURE USER IS LOGGED INTO THIS ORG
    if (req.cookies.organization && req.params.idName == req.cookies.organization.idName) {
      res.render("organization-update.html", context={ blockElements, cookies: req.cookies, s3Link, organization: await organizationModel.findOne({ _id: req.cookies.organization._id }), googleApiKey });
    } else {
      res.render("errors/permission.html", context={ blockElements, cookies: req.cookies, s3Link });
    }
  })
  .post(async (req, res) => {
    // GET LOCATION COORDINATES
    let location = { name: req.body.location };
    if (req.body.location) {
      const locationJson = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.location}&key=${googleApiKey}`);
      if (locationJson.data.results[0]) {
        location = {
          name: req.body.location,
          lat: locationJson.data.results[0].geometry.location.lat,
          lng: locationJson.data.results[0].geometry.location.lng
        }
      }
    }

    // HANDLING SOCIAL LINKS
    let links = {};
    if (req.body.instagram) {
      links.instagram = req.body.instagram;
    }
    if (req.body.facebook) {
      links.facebook = req.body.facebook;
    }
    if (req.body.twitter) {
      links.twitter = req.body.twitter;
    }
    if (req.body.linkedin) {
      links.linkedin = req.body.linkedin;
    }
    if (req.body.website) {
      links.website = req.body.website;
    }

    // MAKE SURE USER IS LOGGED INTO THIS ORG
    if (req.cookies.organization && req.params.idName == req.cookies.organization.idName) {
      let updateObject = {
        name: req.body.name,
        email: req.body.email,
        description: req.body.description,
        targetAudience: req.body.targetAudience,
        cause: req.body.cause,
        interests: req.body.interests,
        idName: req.body.name.toLowerCase().replace(" ", "-"),
        location,
        links
      }

      // SAVING LOGO IF EXISTS
      if (req.files) {
        const logo = req.files.logo;
        if (logo) {
          uploadFile(logo); // UPLOAD TO S3
          data.logo = logo.name;
        }
      }

      organizationModel.findOneAndUpdate(
        { _id: req.cookies.organization._id },
        updateObject,
        { new: true },
        (err, organization) => {
          if (err) throw err;
        }
      )

      res.redirect(`/@${req.cookies.organization.idName}`);
    } else {
      res.render("errors/permission.html", context={ blockElements, cookies: req.cookies, s3Link });
    }
  });

app.get("/@:idName/verify-nonprofit-status", (req, res) => {
    if (req.cookies.organization && req.params.idName == req.cookies.organization.idName) {
      if (!req.cookies.organization.verifiedNonprofit) {
        res.render("verify-nonprofit-status.html", context={ blockElements, cookies: req.cookies, s3Link, googleApiKey });
      } else {
        res.send("You are already a verified 501(c)(3) nonprofit!");
      }
    } else {
      res.render("errors/permission.html", context={ blockElements, cookies: req.cookies, s3Link });
    }
  });


require("./routes/api")(app);
require("./routes/forgot-password")(app, blockElements);


setInterval(function() {
  downBumpOrganizations();
}, 3600000);


// Setting up server for production
const devProduction = true;  // Variable to allow React.js redirects if testing production functionality
if (process.env.NODE_ENV == "production" || devProduction) {
  // Listing /public directory as static
  app.use(express.static(__dirname + "/build"));

  // Redirecting pages not caught by above Express calls to Vue
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/build/index.html");
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[+] NPO core server is listening on port ${port}...`);
});
