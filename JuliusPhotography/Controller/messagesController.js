const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

// Define the route '/send-email' inside the router
router.post('/send-email', (req, res) => {
  const { recipient, subject, message } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'cinci57450@gmail.com', // Replace with your email address
      pass: '' // Replace with your email password

    }
  });

  // Define the email options
  const mailOptions = {
    from: 'cinci57450@gmail.com', // Replace with your email address
    to: recipient,
    subject: subject,
    text: message
  };
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});

module.exports = router;
