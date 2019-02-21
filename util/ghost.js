import GhostContentAPI from '@tryghost/content-api'

// env variables loaded from nuxt config
const api = new GhostContentAPI({
  host: process.env.ghostUri,
  key: process.env.ghostKey,
  version: 'v2'
})

const generateRoutes = async () => {

}

export { api as default, generateRoutes }
