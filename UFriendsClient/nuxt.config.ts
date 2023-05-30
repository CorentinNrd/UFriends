// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', 'nuxt-vitest', 'nuxt-icon'],
    // @ts-ignore
    alias: {
        '@': '.',
    },
    app: {
        pageTransition: {name: 'page', mode: 'out-in'},
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'UFriends',
            // link: [{ rel: 'icon', type: 'image/png', href: '/UFriendsClient/images/PiniaLogo.png' }],
        },
    },
});
