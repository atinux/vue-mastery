module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Vue Mastery',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Vue Mastery is the ultimate learning resource for Vue.js developers. We release weekly video tutorials and articles as well as the proud producers of the official Vue.js News. You can consume it in newsletter and podcast format at news.vuejs.org.' },
      { hid: 'keywords', name: 'keywords', content: 'vue js, vue.js, vue javascript, vue.js tutorial, vue.js components, vue.js framework, javascript, learn to code, web development, web design, vue.js plugin, vue.js api, build vue.js, vue.js syntax' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/normalize.css'
      },
      {
        href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,400,600,700',
        rel: 'stylesheet'
      },
      {
        href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css',
        rel: 'stylesheet'
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/style.styl'
  ],
  /*
   ** Site Modules
   */
  modules: [
    ['@nuxtjs/pwa', { icon: false }]
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#39B982' },
  /*
   ** Router config
   */
  router: {
    // middleware: 'authenticated'
  },
  plugins: [
    {
      src: '~/plugins/auth',
      ssr: false
    },
    {
      src: '~/plugins/vimeo-player',
      ssr: false
    },
    {
      src: '~/plugins/filters'
    },
    {
      src: '~/plugins/modals',
      ssr: false
    },
    {
      src: '~/plugins/social',
      ssr: false
    }
  ],
  /*
  ** Page transition
  */
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'firebase',
      'firebase-auth',
      'vuexfire',
      'vue-vimeo-player'
    ],
    // put CSS in files instead of JS bundles
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
