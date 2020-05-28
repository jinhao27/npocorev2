const mongoose = require("mongoose");
const { organizationModel } = require("../models");

module.exports = function(app) {

  app.get("/api/get-organizations", async (req, res) => {
    const organizations = await organizationModel.find({});
    res.send(organizations);
  });

  app.post("/api/add-organization", async (req, res) => {
    const organization = req.body;
    const newOrganization = await new organizationModel(organization);
    await newOrganization.save((err, organization) => { if (err) throw err; });
  });

}
