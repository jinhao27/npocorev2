const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const { organizationModel, postModel, passwordResetSessionModel } = require("../models");
const { hourlyBump, postBump, featureBump, referralBump, hourlyDownBump, downBumpOrganizations } = require("../nposcore-functions");
const { v4: uuidv4 } = require('uuid');

module.exports = function(app) {
  app.route("/auth/forgot-password")
    .get((req, res) => {
      res.render("forgot-password/forgot-password.html");
    })
    .post(async (req, res) => {
      const email = req.body.email;

      // CHECK IF ORGANIZATION WITH THIS EMAIL EXISTS
      const exists = await organizationModel.exists({ email });
      if (exists) {
        const newPasswordResetSessionModel = new passwordResetSessionModel({
          sessionId: uuidv4(),
          organization: await organizationModel.findOne({ email })
        });
        newPasswordResetSessionModel.save((err) => { if (err) throw err; });

        res.redirect("/auth/confirm-password");
      } else {
        res.send("No organization with this email exists.");
      }
    });

  app.route("/auth/change-password/:id")
    .get(async (req, res) => {
      const passwordResetSession = await passwordResetSessionModel.findOne({ sessionId: req.params.id });

      if (passwordResetSession) {
        res.render("forgot-password/change-password.html", context={ passwordResetSession });
      } else {
        res.send("This password reset session doesn't exist.");
      }
    })
    .post(async (req, res) => {
      const organizationId = req.body.organizationId;
      const password = req.body.password;
      const confirmPassword = req.body.confirmPassword;

      if (password == confirmPassword) {
        await organizationModel.findOneAndUpdate(
          { _id: organizationId },
          { password: passwordHash.generate(password) },
          { new: true },
          (err, organization) => {
            if (err) throw err;
          }
        )

        res.redirect("/auth/success");
      } else {
        res.send("The passwords don't match. Please try again.");
      }
    });

  app.get("/auth/confirm-password", (req, res) => {
    res.render("forgot-password/confirm-password.html");
  });

  app.get("/auth/success", (req, res) => {
    res.render("forgot-password/success.html");
  });
}
