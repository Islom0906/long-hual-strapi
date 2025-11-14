'use strict';

const {sendEmail} = require("../../../../utils/email");



module.exports = {
    async afterCreate(event) {
        const { result } = event;
        try {
            await sendEmail({
                subject: `New message: ${result.name}`,
                text: `Name: ${result.name}\nEmail: ${result.email}\nMessage: ${result.message}`,
                html: `
                <h3> New message </h3>
            <p><strong>Name:</strong> ${result.name}</p>
            <p><strong>Email:</strong> ${result.email}</p>
            <p><strong>Telephone:</strong><br/>${result.phone}</p>
            <p><strong>Contact method:</strong><br/>${result.contact_method}</p>
            <p><strong>User message:</strong><br/>${result.message}</p>
                `,
                to:process.env.EMAIL_FOR_CLIENTS
            });

        } catch (err) {
            strapi.log.error('❌ Email yuborishda xato:', err);
        }
    },
};