'use strict';


/**
 * banner-about controller
 */

const { createCoreController } = require('@strapi/strapi').factories;



module.exports = createCoreController('api::banner-about.banner-about', ({ strapi }) => ({
    async find(ctx) {
        const data = await super.find({
            ...ctx,
            query: {
                ...ctx.query,
                populate: {
                    image: {
                        fields: ['id', 'url'],
                    },
                },
            },
        });


        return data;
    },
}));
