import { generateRoutes } from './util/ghost'
const pkg = require('./package')
require('dotenv').config()

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    // title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ]
  },
  /*
   ** Add overriding info for meta items
   */
  meta: {
    name: 'JSNG' // this is needed to change title for all PWA meta tags
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#e84b0d' },

  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.scss'],
  /*
   ** Global page transition
   ** https://nuxtjs.org/api/configuration-transition#the-pagetransition-property
   ** Configure the page transition classes is ~assets/css/main.scss
   ** Currently disabled and using basic css animation as this doesn't have effect on generated sites
   */
  // pageTransition: {
  //   name: 'page',
  //   modde: 'in-out'
  // },
  // layoutTransition: {
  //   name: 'page',
  //   modde: 'in-out'
  // },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/filters.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    // '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    'nuxt-purgecss'
  ],
  eslint: {
    // configure @nuxtjs/eslint-module
    fix: true
  },
  purgeCSS: {
    // configure purgecss
    type: 'webpack'
  },
  stylelint: {
    fix: true
  },
  styleResources: {
    scss: ['~assets/css/_variables.scss']
  },
  env: {
    // loaded from .env file locally and from netlify in deployment
    ghostUri: process.env.GHOST_URI,
    ghostKey: process.env.GHOST_KEY,
    siteUrl: process.env.SITE_URL
  },
  workbox: {
    dev: false
  },
  /*
   * Generate dynamic routes for static site generations
   */
  generate: {
    subFolders: false,
    routes: generateRoutes
  },
  /*
   ** Extend routes so multiple routes can use same component
   */
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'PostIndex',
        path: '/page/:pageNumber',
        component: resolve(__dirname, 'pages/index.vue')
      })

      routes.push({
        name: 'TagIndex',
        path: '/tag/:slug/page/:pageNumber',
        component: resolve(__dirname, 'pages/tag/_slug.vue')
      })

      routes.push({
        name: 'AuthorIndex',
        path: '/author/:slug/page/:pageNumber',
        component: resolve(__dirname, 'pages/author/_slug.vue')
      })
    }
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    extend(config, ctx) {
      // config for vue-svg-loader
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))

      svgRule.test = /\.(png|jpe?g|gif|webp)$/

      config.module.rules.push({
        test: /\.svg$/,
        use: ['babel-loader', 'vue-svg-loader']
      })
    }
  }
}
