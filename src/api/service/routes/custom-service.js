module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/services/:slug',
            handler: 'service.findBySlug',
            config: {
                auth: false,
            },
        },
    ],
};
