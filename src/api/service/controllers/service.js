'use strict';

/**
 * service controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::service.service', ({ strapi }) => ({

    // 🔹 /api/service/:slug
    async findBySlug(ctx) {
        try {
            const { slug } = ctx.params;

            const entity = await strapi.db.query('api::service.service').findOne({
                where: { slug },
                populate: {
                    image: {
                        select: ['id', 'url'], // faqat kerakli maydonlar
                    },
                    Advantages: {
                        select: ['title', 'text', 'button'], // komponentning o‘z maydonlari
                        populate: {
                            image: {
                                select: ['id', 'url'], // komponent ichidagi rasm
                            },
                        },
                    },
                },
            });

            if (!entity) {
                return ctx.notFound('Service not found');
            }

            return entity;
        } catch (error) {
            strapi.log.error('Error in findBySlug:', error);
            return ctx.internalServerError('Something went wrong');
        }
    },

    // 🔹 /api/service
    async find(ctx) {
        try {
            const entities = await strapi.db.query('api::service.service').findMany({
                where: { publishedAt: { $notNull: true } }, // faqat published bo‘lganlar
                select: ['id', 'title', 'slug', 'text'], // kerakli maydonlar
                populate: {
                    image: {
                        select: ['id', 'url'], // faqat rasm ma’lumotlari
                    },
                },
            });

            return entities;
        } catch (error) {
            strapi.log.error('Error in find:', error);
            return ctx.internalServerError('Something went wrong');
        }
    },

}));
