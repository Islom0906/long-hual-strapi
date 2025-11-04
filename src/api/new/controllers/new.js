'use strict';

/**
 * new controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::new.new', ({ strapi }) => ({
    async findBySlug(ctx) {
        try {
            const { slug } = ctx.params;

            const entity = await strapi.db.query('api::new.new').findOne({
                where: { slug },
                populate: {
                    image: {
                        select: ['id', 'url'],
                    },
                },
            });

            if (!entity) {
                return ctx.notFound('News not found');
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

                    image: {
                        fields: ['id', 'url'],
                    },
                },
            },
        });


        return data;
    },
}));
