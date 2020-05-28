const express = require("express");
const mongoose = require("mongoose");

app = express();


app.get("/", (req, res) => {
  res.send("Hello World!");
});


// Setting up server for production
const devProduction = false;  // Variable to allow React.js redirects if testing production functionality
if (process.env.NODE_ENV == "production" || devProduction) {
  // Listing /public directory as static
  app.use(express.static(__dirname + "/public"));

  // Redirecting pages not caught by above Express calls to Vue
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[+] NPO core server is listening on port ${port}...`);
});
