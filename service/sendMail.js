const { email } = require("../debugging/debug"),
    nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
});

module.exports = {
    sendVerificationEmail: (user, link) => {
        const mailToSend = {
            from: process.env.GMAIL_USER,
            to: user.email,
            subject: "Email verification",
            html: `<p>Hi ${user.name}</p>
            <p>Please click on the following link to verify your account.</p>
            <a href="${link}">${link}</a><br>
            <p>If you did not request this, please ignore this email.</p>`
        };

        transporter
            .sendMail(mailToSend)
            .then(() => email("Email has been sent."))
            .catch(() => email("Email not sent."));
    },

    sendResetPasswordEmail: (user, link) => {
        const mailToSend = {
            from: process.env.GMAIL_USER,
            to: user.email,
            subject: "Reset password",
            html: `<p>Hi ${user.name}</p>
            <p>Please click on the following to reset your password.</p>
            <a href="${link}">${link}</a><br>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
        };

        transporter
            .sendMail(mailToSend)
            .then(() => email("Email has been sent."))
            .catch(() => email("Email not sent."));
    },

    sendConfirmationEmail: (user) => {
        const mailToSend = {
            from: process.env.GMAIL_USER,
            to: user.email,
            subject: "Password changed successfully",
            html: `<p>Hi ${user.name}</p>
            <p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>`
        };

        transporter
            .sendMail(mailToSend)
            .then(() => email("Email has been sent."))
            .catch(() => email("Email not sent."));
    }
};
