const mongoose = require("mongoose");
const { organizationModel, postModel } = require("../models");

module.exports = function(app) {

  app.get("/api/get-organizations", async (req, res) => {
    const organizations = await organizationModel.find({});
    res.send(organizations);
  });

  app.post("/api/add-organization", (req, res) => {
    const organization = req.body;
    console.log(organization);
    const newOrganization = new organizationModel({
      name: 'Calix Huang',
      email: 'calix.huang1@gmail.com',
      description: 'asdf',
      website: 'https://www.calix.dev/',
      gender: 'Male',
      cause: 'Animal Welfare',
      interests: [ 'Sponsors', 'Clients' ]
    });
    newOrganization.save((err, organization) => { if (err) throw err; });
  });

  app.get("/api/get-organization", async (req, res) => {
    const organization = organizationModel.findOne({
      email: req.query.email,
      password: req.query.password
    });

    return organization;
  })

}
