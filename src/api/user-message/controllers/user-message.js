'use strict';

const {sendEmail} = require("../../../utils/email");
/**
 * user-message controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::user-message.user-message', ({strapi}) => ({
    async create(ctx) {
        try {
            const {name, email, phone, contact_method, message} = ctx.request.body.data;
            // Bazaga yozish
            const response = await super.create(ctx);





            await strapi.plugin("email").service("email").send({
                to: process.env.RECEIVER_EMAIL, // Admin yoki kompaniya pochtasi
                from: process.env.SMTP_USERNAME, // no-reply
                subject: `New message: ${name}`,
                text: `Name: ${name}\nEmail: ${email}\nXabar: ${message}`,
                html: `
                < h3 > New message < /h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telephone:</strong><br/>${phone}</p>
            <p><strong>Contact method:</strong><br/>${contact_method}</p>
            <p><strong>User message:</strong><br/>${message}</p>
                `,
            });


            strapi.log.info(`✅ Email yuborildi: ${email} -> ${process.env.RECEIVER_EMAIL}`);
            return response;
        } catch
            (err) {
            console.error("Email yuborishda xato:", err);
            ctx.throw(500, "Email yuborishda xatolik yuz berdi");
        }
    }
    ,
}));
