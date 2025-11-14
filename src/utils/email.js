const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // agar 465 bo'lsa
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
    requireTLS: true,

});
async function sendEmail({ subject, text, html,to }) {
  const info=  await transporter.sendMail({
        from: `"No Reply" <${process.env.SMTP_USERNAME}>`,
        to: to,
        subject,
        text,
        html,
    });

}

module.exports = { sendEmail };