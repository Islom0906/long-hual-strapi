module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/drivers/:slug',
            handler: 'driver.findBySlug',
            config: {
                auth: false,
            },
        },
    ],
};
