'use strict';

/**
 * driver controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::driver.driver', ({ strapi }) => ({
    async findBySlug(ctx) {
        try {
            const { slug } = ctx.params;

            const entity = await strapi.db.query('api::driver.driver').findOne({
                where: { slug },
                populate: {
                    requirements: {
                        fields: ['text'],
                    },
                },
            });

            if (!entity) {
                return ctx.notFound('Driver not found');
            }

            return entity;
        } catch (error) {
            strapi.log.error('Error in findBySlug:', error);
            return ctx.internalServerError('Something went wrong');
        }
    },
    async find(ctx) {
        const data = await super.find({
            ...ctx,
            query: {
                ...ctx.query,
                populate: {
                    requirements: {
                        fields: ['text'],
                    },


                },
            },
        });

        return data;
    },
}));
