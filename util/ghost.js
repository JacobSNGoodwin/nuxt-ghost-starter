import GhostContentAPI from '@tryghost/content-api'

// we have this function accept variables to be accessible to config.js
const ghostAPI = (host, key) => {
  return new GhostContentAPI({
    host: host,
    key: key,
    version: 'v2'
  })
}

const generateRoutes = async () => {
  const host = process.env.GHOST_URI
  const key = process.env.GHOST_KEY

  const api = ghostAPI(host, key)

  // initialize array of routes to be filled
  const routes = []

  // create posts routes
  const posts = await api.posts.browse({ fields: 'title,slug,id', limit: 'all' })

  posts.forEach((post) => {
    routes.push({
      route: '/posts/' + post.slug,
      payload: post
    })
  })

  // create tag routes
  const tags = await api.tags.browse({
    fields: 'name,slug,id',
    limit: 'all',
    filter: 'visibility:public' })

  tags.forEach((tag) => {
    routes.push({
      route: '/tags/' + tag.slug,
      payload: tag
    })
  })

  return routes
}

export { ghostAPI, generateRoutes }
