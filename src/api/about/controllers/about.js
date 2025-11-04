'use strict';

/**
 * about controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::about.about', ({ strapi }) => ({
    async find(ctx) {
        const data = await super.find({
            ...ctx,
            query: {
                ...ctx.query,
                populate: {
                    benefits_media: {
                        fields: ['id', 'url'], // ✅ select emas, fields
                    },
                    benefits_text: {
                        fields: ['title', 'text'], // ✅ select emas, fields
                    },
                    teams_card: {
                        populate: {
                            image: {
                                fields: ['id', 'url'], // ✅ select emas, fields
                            },
                        },
                    },
                },
            },
        });

        return data;
    },
}));
