export default {
  config: {
    menus: {
      overrides: {
        'content-type-builder': {
          sectionLinks: [
            'driver',
            'service',
            'news',
            'testimonials',
            'application',
            'user-message',
            'user',
          ],
          singleTypesLinks: [
            'banner-and-about-section',
            'about',
            'contact',
            'counter',
            'privacy-policy',
          ],
        },
      },
    },
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "Admin Panel",

        "app.components.LeftMenu.navbrand.workplace": "Admin Panel",

        "Auth.form.welcome.title": "Welcome to admin panel ",

        "Auth.form.welcome.subtitle": "Login to your account",

        "Settings.profile.form.section.experience.interfaceLanguageHelp":
            "Preference changes will apply only to you.",
      },
    },
    // Disable video tutorials
    tutorials: false,
    // Disable notifications about new Strapi releases
    notifications: { releases: false },
  },
  bootstrap(app) {
    console.log(app);
  },
};
