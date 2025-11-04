'use strict';

/**
 * testimonial controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::testimonial.testimonial', ({ strapi }) => ({
    async find(ctx) {
        const data = await super.find({
            ...ctx,
            query: {
                ...ctx.query,
                populate: {

                    user: {
                        fields: ['id', 'url'],
                    },
                },
            },
        });


        return data;
    },
}));
