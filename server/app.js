const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const { organizationModel, postModel } = require("./models");

app = express();

// Configuring cookie parser with express
app.use(cookieParser())

// Setting JSON parsing methods for POST request data
app.use(express.urlencoded()); // HTML forms
app.use(express.json()); // API clients

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

// INITALIZING ALL BLOCK ELEMENTS
let blockElementsNames = ["imports", "navbar"];
let blockElements = [];
for (var i = 0; i < blockElementsNames.length; i++) {
  fs.readFile(__dirname + `/views/blocks/${blockElementsNames[i]}.html`, "utf-8", (err, data) => {
    if (err) throw err;

    blockElements.push(data);
  });
}


app.get("/", (req, res) => {
  res.render("index.html", context={ blockElements, cookies: req.cookies });
});

app.get("/contact", (req, res) => {
  res.render("contact.html", context={ blockElements, cookies: req.cookies });
});

app.get("/posts", async (req, res) => {
  const posts = await postModel.find({}).sort({ datetimePosted: -1 });

  res.render("posts.html", context={ blockElements, cookies: req.cookies, posts });
});

app.get("/organizations/:id", async (req, res) => {
  const organization = await organizationModel.findOne({ _id: req.params.id }).catch((err) => {
    res.send("That organization does not exist.");
  });

  if (organization) {
    res.render("organization.html", context={ blockElements, cookies: req.cookies, organization });
  } else {
    res.send("That organization does not exist.");
  }
});

app.route("/organizations/:id/post")
  .get((req, res) => {
    // MAKE SURE USER IS LOGGED INTO THIS ORG
    if (req.params.id == req.cookies.organization._id) {
      res.render("make-post.html", context={ blockElements, cookies: req.cookies });
    } else {
      res.send("You do not have permission to view this page.");
    }
  })
  .post((req, res) => {
    // MAKE SURE USER IS LOGGED INTO THIS ORG
    if (req.params.id == req.cookies.organization._id) {
      // CREATE POST
      const newPost = new postModel({
        title: req.body.title,
        content: req.body.content,
        datetimePosted: new Date(),
        creator: req.cookies.organization
      });
      newPost.save((err) => { if (err) throw err; })

      res.redirect("/posts");
    } else {
      res.send("You do not have permission to view this page.");
    }
  });

app.route("/organizations/:id/update")
  .get((req, res) => {
    // MAKE SURE USER IS LOGGED INTO THIS ORG
    if (req.params.id == req.cookies.organization._id) {
      res.render("organization-update.html", context={ blockElements, cookies: req.cookies, organization: req.cookies.organization });
    } else {
      res.send("You do not have permission to update this organization.");
    }
  })
  .post((req, res) => {
    // MAKE SURE USER IS LOGGED INTO THIS ORG
    if (req.params.id == req.cookies.organization._id) {
      organizationModel.findOneAndUpdate(
        { _id: req.cookies.organization._id },
        {
          name: req.body.name,
          email: req.body.email,
          description: req.body.description,
          gender: req.body.gender,
          cause: req.body.cause,
          interests: req.body.interests,
        },
        { new: true },
        (err, organization) => {
          if (err) throw err;
        }
      )

      res.redirect("/");
    } else {
      res.send("You do not have permission to update this organization.");
    }
  });

app.route("/login")
  .get((req, res) => {
    res.render("login.html", context={ blockElements, cookies: req.cookies });
  })
  .post(async (req, res) => {
    const organization = await organizationModel.findOne({
      email: req.body.email,
      password: req.body.password
    });

    if (organization) {
      res.cookie("organization", organization);
      res.redirect("/");
    } else {
      res.send("Invalid credentials.");
    }
  });

app.route("/register")
  .get((req, res) => {
    res.render("register.html", context={ blockElements, cookies: req.cookies });
  })
  .post(async (req, res) => {
    const newOrganization = new organizationModel(req.body);
    newOrganization.save((err, organization) => { if (err) throw err; });

    res.cookie("organization", req.body);

    res.redirect("/");
  });

app.get("/logout", (req, res) => {
  res.clearCookie("organization");
  res.redirect("/");
});

require("./routes/api")(app);


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
