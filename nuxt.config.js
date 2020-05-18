require('dotenv').config()
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  generate: {
    async routes() {
      const faunadb = require('faunadb')
      const query = faunadb.query
      const slugify = require('slugify')
      const q = query
      if (!process.env.FAUNA_SERVER_KEY) {
        throw new Error('FAUNA_SERVER_KEY not found.')
      }
      const client = new faunadb.Client({
        secret: process.env.FAUNA_SERVER_KEY
      })
      const result = await client.query(
        q.Map(
          q.Paginate(q.Match(q.Index('allRepos'))),
          q.Lambda('X', q.Get(q.Var('X')))
        )
      )
      const repos = result.data.map((repo) => repo.data)
      const routes = repos.map((repo) => {
        const repoUrlParts = repo.repoUrl.split('/')
        const slug = slugify(repoUrlParts[repoUrlParts.length - 1], {
          remove: /[*+~.()'"!:@]/g
        })
        repo.slug = slug
        return {
          route: '/repos/' + slug,
          payload: repo
        }
      })
      routes.push({
        route: '/',
        payload: repos
      })
      return routes
    }
  }
}
