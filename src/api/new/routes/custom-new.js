module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/news/:slug',
            handler: 'new.findBySlug',
            config: {
                auth: false,
            },
        },
    ],
};
