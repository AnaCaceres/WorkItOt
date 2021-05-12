export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Work It Out!',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css',
      },
    ],
    script: [
      {
        src:
          'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js',
        body: true,
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/styles/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '~plugins/v-calendar.js', ssr: false }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/fontawesome',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
  ],

  fontawesome: {
    icons: {
      brands: ['faFacebook', 'faGoogle'],
      solid: [
        'faUserCog',
        'faArrowCircleRight',
        'faArrowCircleLeft',
        'faShoppingBasket',
        'faTasks',
        'faUtensils',
        'faDumbbell',
        'faWeight',
        'faPlusCircle',
        'faBuilding',
        'faUserNinja',
        'faTrashAlt',
        'faPencilAlt',
      ],
    },
  },

  firebase: {
    config: {
      apiKey: 'AIzaSyDGoivAQISl1yJaHaCMlvCAxP7dUswIYEI',
      authDomain: 'workitout-7ac8f.firebaseapp.com',
      databaseURL: 'https://workitout-7ac8f.firebaseio.com',
      projectId: 'workitout-7ac8f',
      storageBucket: 'workitout-7ac8f.appspot.com',
      messagingSenderId: '571698421782',
      appId: '1:571698421782:web:8a5b26a1150e5dbf459537',
      measurementId: 'G-JM7BL5WVB3',
    },
    services: {
      auth: {
        static: true,
        persistence: 'local',
      },
      firestore: {
        enablePersistence: true,
      },
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  /* server: {
    port: 8000, // default: 3000
    host: '0.0.0.0', // default: localhost
  }, */
}
