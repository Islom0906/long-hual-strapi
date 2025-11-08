const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // agar 465 bo'lsa
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});
async function sendEmail({ subject, text, html }) {
    console.log("✅ Email yuborildi!");
  const info=  await transporter.sendMail({
        from: `"No Reply" <${process.env.SMTP_USERNAME}>`,
        to: process.env.RECEIVER_EMAIL,
        subject,
        text,
        html,
    });

    // Nodemailer javobini logga chiqarish
    console.log("📨 Message ID:", info.messageId);
    console.log("🧾 Server javobi:", info.response);
    console.log("➡️ Qabul qiluvchi:", process.env.RECEIVER_EMAIL);
}

module.exports = { sendEmail };