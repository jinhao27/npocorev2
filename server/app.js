const express = require("express");
const mongoose = require("mongoose");
const { organizationModel } = require("./models");

app = express();

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


app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/contact", (req, res) => {
  res.render("contact.html");
});

app.get("/login", (req, res) => {
  res.render("login.html");
});

app.get("/register", (req, res) => {
  res.render("register.html");
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
