const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

const sendEmail = (subject, destination, message) => {
  const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  }));

  const mailOptions = {
    from: 'npocoreinfo@gmail.com',
    to: destination,
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, function(err, info){
    if (err) throw err;
  });
}

module.exports = { sendEmail };
