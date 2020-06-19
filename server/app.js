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
const rateLimit = require("express-rate-limit");
const { check, validationResult } = require('express-validator');
const S3Strategy = require('express-fileuploader-s3');
const AWS = require('aws-sdk');
const { sendEmail } = require("./helper-functions");
const { organizationModel, postModel, passwordResetSessionModel } = require("./models");
const { hourlyBump, postBump, featureBump, referralBump, hourlyDownBump, downBumpOrganizations } = require("./nposcore-functions");

const imageFileExtensions = ["png", "jpg", "jpeg", "svg"];

app = express();

// Configuring cookie parser with express
app.use(cookieParser())

// Setting rate limit for express
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: "You've been making too many requests to the server. Please try again in 15 minutes."
});

// Setting JSON parsing methods for POST request data
app.use(express.urlencoded()); // HTML forms
app.use(express.json()); // API clients
app.use(fileupload()); // FILES
// app.use(expressSanitizer()); // EXPRESS INPUT SANTIZATION

// AWS S3 CONFIGURATION
const accessKeyId = process.env.ACCESS_KEY_ID || "AKIAZSHQMZHOEJEXNF3M";
const secretAccessKey = process.env.SECRET_ACCESS_KEY || "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";
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

app.use(async function (req, res, next) {
  if (!(req.originalUrl == "/logout")) {
    if (req.cookies.organization) {
      // RESETTING COOKIES
      const organization = await organizationModel.findOne({ _id: req.cookies.organization._id });

      const oneDay = 24 * 3600 * 1000;
      res.cookie("organization", organization, {
        expires: new Date(Date.now() + oneDay)
      });
    }
  }

  next()
});

app.get("/", (req, res) => {
  res.render("index.html", context={ blockElements, cookies: req.cookies, s3Link });
});

app.get("/contact", (req, res) => {
  res.render("contact.html", context={ blockElements, cookies: req.cookies, s3Link });
});

// NEWS
app.get("/news/whats-new-in-npo-core-v2", (req, res) => {
  res.render("news/npo-core-v2-features.html", context={ blockElements, cookies: req.cookies, s3Link });
});

app.get("/news/what-is-a-npo-score", (req, res) => {
  res.render("news/what-is-npo-score.html", context={ blockElements, cookies: req.cookies, s3Link });
});

app.route("/register")
  .get(async (req, res) => {
    const organizations = await organizationModel.find({});
    const orgNames = organizations.map(organization => organization.name);
    res.render("register.html", context={ blockElements, cookies: req.cookies, s3Link, googleApiKey, orgNames, error: "" });
  })
  .post(limiter, [
    check('name').isLength({ max: 50 }).trim().escape(),
    check('email').isLength({ max: 50 }).isEmail().trim().escape(),
    check('description').isLength({ max: 300 }).trim().escape(),
    check('location').isLength({ max: 200 }).trim().escape(),
    check('referrer').isLength({ max: 50 }).trim().escape(),
    check('logo').trim().escape(),
    check('instagram').isLength({ max: 100 }),
    check('facebook').isLength({ max: 100 }),
    check('twitter').isLength({ max: 100 }),
    check('linkedin').isLength({ max: 100 }),
    check('website').isLength({ max: 100 })
  ], async (req, res) => {
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
        // VALIDATING FILE TYPE
        const fileExtension = logo.name.split(".")[1];
        if (imageFileExtensions.includes(fileExtension)) {
          uploadFile(logo); // UPLOAD TO S3
          data.logo = logo.name;
        } else {
          res.send("Invalid image file input.");
          return;
        }
      }
    }

    // GENERATING IDNAME
    data.idName = "";

    for (let i = 0; i < req.body.name.length; i++) {
      if (req.body.name.charAt(i) != " ") {
          data.idName += req.body.name.charAt(i);
        } else {
          data.idName += "-";
        }
    }
    // data.idName = req.body.name.toLowerCase().replace(" ", "-");

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
  .post(limiter, [
    check('email').isEmail().trim().escape()
  ], async (req, res) => {
    const organization = await organizationModel.findOne({ email: req.body.email });

    if (organization) {
      if (passwordHash.verify(req.body.password, organization.password)) {
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
  .get(async (req, res) => {
    const organization = await organizationModel.findOne({ idName: req.params.idName });

    if (organization) {
      const posts = await postModel.find({ "creator.idName": organization.idName });
      res.render("organization.html", context={ blockElements, cookies: req.cookies, s3Link, organization, posts });
    } else {
      res.render("errors/organization.html", context={ blockElements, cookies: req.cookies, s3Link });
    }
  })
  .post(limiter, [
    check('email').isEmail().trim().escape()
  ], async (req, res) => {
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
  .post(limiter, [
    check('title').isLength({ max: 50 }).trim().escape(),
    check('content').isLength({ max: 500 }).trim().escape(),
    check('buttonText').isLength({ max: 20 }).trim().escape(),
    check('buttonLink').isLength({ max: 100 }).trim().escape()
  ], (req, res) => {
    // MAKE SURE USER IS LOGGED INTO THIS ORG
    if (req.cookies.organization && req.params.idName == req.cookies.organization.idName) {
      // CREATE POST
      const post = {
        title: req.body.title,
        content: req.body.content,
        datetimePosted: new Date(),
        creator: req.cookies.organization,
        button: {
          text: req.body.buttonText,
          link: req.body.buttonLink,
          color: req.body.buttonColor
        },
        type: req.body.type
      };

      // SAVING IMAGE IF EXISTS
      if (req.files) {
        const image = req.files.image;

        if (image) {
          // VALIDATING FILE TYPE
          const fileExtension = image.name.split(".")[1];
          if (imageFileExtensions.includes(fileExtension)) {
            uploadFile(image); // UPLOAD TO S3
            post.image = image.name;
          } else {
            res.send("Invalid image file input.");
            return;
          }
        }
      }

      const newPost = new postModel(post);
      newPost.save((err) => { if (err) throw err; });

      // BUMPING NPO SCORE + ADDING POST
      organizationModel.findOneAndUpdate(
        { _id: req.cookies.organization._id },
        { npoScore: postBump(req.cookies.organization.npoScore) },
        { new: true },
        (err, organization) => {
          if (err) throw err;

          // NOTIFY ALL SUBSCRIPTIONS
          if (organization.subscriptions) {
            for (email of organization.subscriptions) {
              // sendEmail(`NPO Core - New post from ${organization.name}`, email, `Check out ${organization.name}'s newest post on NPO Core!\n\nhttp://${req.get("host")}/opportunities/${newPost._id}`);
            }
          }
        }
      )

      res.redirect("/opportunities");
    } else {
      res.render("errors/permission.html", context={ blockElements, cookies: req.cookies, s3Link });
    }
  });

app.route("/@:idName/update")
  .get(async (req, res) => {
    // MAKE SURE USER IS LOGGED INTO THIS ORG
    if (req.cookies.organization && req.params.idName == req.cookies.organization.idName) {
      res.render("organization-update.html", context={ blockElements, cookies: req.cookies, s3Link, organization: await organizationModel.findOne({ _id: req.cookies.organization._id }), googleApiKey, error: "" });
    } else {
      res.render("errors/permission.html", context={ blockElements, cookies: req.cookies, s3Link });
    }
  })
  .post(limiter, [
    check('name').isLength({ max: 50 }).trim().escape(),
    check('email').isLength({ max: 50 }).isEmail().trim().escape(),
    check('description').isLength({ max: 300 }).trim().escape(),
    check('location').isLength({ max: 200 }).trim().escape(),
    check('referrer').isLength({ max: 50 }).trim().escape(),
    check('logo').trim().escape(),
    check('instagram').isLength({ max: 100 }),
    check('facebook').isLength({ max: 100 }),
    check('twitter').isLength({ max: 100 }),
    check('linkedin').isLength({ max: 100 }),
    check('website').isLength({ max: 100 })
  ], async (req, res) => {
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
        idName: req.body.name.toLowerCase().replace(" ", "-"),
        email: req.body.email,
        description: req.body.description,
        targetAudiences: req.body.targetAudiences,
        causes: req.body.causes,
        interests: req.body.interests,
        idName: req.body.name.toLowerCase().replace(" ", "-"),
        location,
        links
      }

      // SAVING LOGO IF EXISTS
      if (req.files) {
        const logo = req.files.logo;

        if (logo) {
          // VALIDATING FILE TYPE
          const fileExtension = logo.name.split(".")[1];
          if (imageFileExtensions.includes(fileExtension)) {
            uploadFile(logo); // UPLOAD TO S3
            updateObject.logo = logo.name;
          } else {
            res.send("Invalid image file input.");
            return;
          }
        }
      }

      organizationModel.findOneAndUpdate(
        { _id: req.cookies.organization._id },
        updateObject,
        { new: true },
        (err, organization) => {
          if (err) {
            res.render("organization-update.html", context={ blockElements, cookies: req.cookies, s3Link, organization: req.cookies.organization, googleApiKey, error: "That organization name/email already exists." });
          } else {
            res.cookie("organization", organization, { overwrite: true });
            res.redirect(`/@${organization.idName}`);
          }
        }
      )
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
