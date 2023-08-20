const nodemailer = require('nodemailer');

// Create a transporter using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'priyadarshanmanoharan@gmail.com',
    pass: 'priyadarshan8300287044'
  }
});

// Email content
const mailOptions = {
  from: 'priyadarshanmanoharan@gmail.com',
  to: 'karthicloud6@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'Well that was easy!!'
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
