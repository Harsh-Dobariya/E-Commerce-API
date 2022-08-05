const { email, errors } = require("../debugging/debug"),
  nodemailer = require("nodemailer"),
  { google } = require("googleapis"),
  OAuth2 = google.auth.OAuth2,
  { EMAIL, CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN, REFRESH_TOKEN, REDIRECT_URI } = process.env;

/* Creating a new OAuth2 object. */
const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

/* Setting the credentials for the oauth2Client. */
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const createTransporter = async () => {
  /* Creating a new promise and then resolving it. */
  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  /* Creating a transporter object. */
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      accessToken,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN
    }
  });

  return transporter;
};

module.exports = {
  sendVerificationEmail: async (user, link) => {
    const mailToSend = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: "Email verification",
      html: `<p>Hi ${user.name}</p>
            <p>Please click on the following link to verify your account.</p>
            <a href="${link}">${link}</a><br>
            <p>If you did not request this, please ignore this email.</p>`
    };

    let emailTransporter = await createTransporter();
    emailTransporter
      .sendMail(mailToSend)
      .then(() => email("Email has been sent"))
      .catch((e) => errors(e.message));
  },

  sendResetPasswordEmail: async (user, link) => {
    const mailToSend = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: "Reset password",
      html: `<p>Hi ${user.name}</p>
            <p>Please click on the following to reset your password.</p>
            <a href="${link}">${link}</a><br>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
    };

    let emailTransporter = await createTransporter();
    emailTransporter
      .sendMail(mailToSend)
      .then(() => email("Email has been sent"))
      .catch((e) => errors(e.message));
  },

  sendConfirmationEmail: async (user) => {
    const mailToSend = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: "Password changed successfully",
      html: `<p>Hi ${user.name}</p>
            <p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>`
    };

    let emailTransporter = await createTransporter();
    emailTransporter
      .sendMail(mailToSend)
      .then(() => email("Email has been sent"))
      .catch((e) => errors(e.message));
  }
};
