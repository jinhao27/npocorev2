const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const { sendEmail } = require("../helper-functions");
const { organizationModel, postModel, passwordResetSessionModel } = require("../models");
const { hourlyBump, postBump, featureBump, referralBump, hourlyDownBump, downBumpOrganizations } = require("../nposcore-functions");
const { v4: uuidv4 } = require('uuid');

module.exports = function(app, blockElements) {
  app.route("/auth/forgot-password")
    .get((req, res) => {
      res.render("forgot-password/forgot-password.html", context={ blockElements, cookies: req.cookies, error: "" });
    })
    .post(async (req, res) => {
      const email = req.body.email;

      // CHECK IF ORGANIZATION WITH THIS EMAIL EXISTS
      const exists = await organizationModel.exists({ email });
      const sessionId = uuidv4();
      if (exists) {
        const newPasswordResetSessionModel = new passwordResetSessionModel({
          sessionId,
          organization: await organizationModel.findOne({ email })
        });
        newPasswordResetSessionModel.save((err) => { if (err) throw err; });

        // SENDING NEW LINK
        sendEmail("NPO Core - Password Reset Link", email, `This link expires in 15 minutes\n\nhttp://${req.get("host")}/auth/change-password/${sessionId}`);

        res.redirect("/auth/confirm-password");
      } else {
        res.render("forgot-password/forgot-password.html", context={ blockElements, cookies: req.cookies, error: "No organization with this email exists." });
      }
    });

  app.route("/auth/change-password/:id")
    .get(async (req, res) => {
      const passwordResetSession = await passwordResetSessionModel.findOne({ sessionId: req.params.id });

      if (passwordResetSession) {
        res.render("forgot-password/change-password.html", context={ passwordResetSession, blockElements, cookies: req.cookies, error: "" });
      } else {
        res.render("errors/password-reset/session-not-exist.html", context={ passwordResetSession, blockElements, cookies: req.cookies })
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
        res.render("forgot-password/change-password.html", context={ passwordResetSession, blockElements, cookies: req.cookies, error: "Passwords don't match. Please try again." });
      }
    });

  app.get("/auth/confirm-password", (req, res) => {
    res.render("forgot-password/confirm-password.html", context={ blockElements, cookies: req.cookies });
  });

  app.get("/auth/success", (req, res) => {
    res.render("forgot-password/success.html", context={ blockElements, cookies: req.cookies });
  });
}
