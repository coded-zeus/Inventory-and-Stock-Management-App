const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      to: send_to,
      from: sent_from,
      subject: subject,
      html: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Email sending error:", error);
  }
};

module.exports = sendEmail;
