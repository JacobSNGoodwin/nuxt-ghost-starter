import GhostContentAPI from '@tryghost/content-api'

// we have this function accept variables to be accessible to config.js
const ghost = (host, key) => {
  return new GhostContentAPI({
    host: host,
    key: key,
    version: 'v2'
  })
}

const generateRoutes = async () => {
  const host = process.env.GHOST_URI
  const key = process.env.GHOST_KEY

  const api = ghost(host, key)

  // initialize array of routes to be filled
  const routes = []

  // create posts routes
  const posts = await api.posts.browse({
    fields: 'title,slug,id',
    limit: 'all',
    order: 'published_at DESC' })

  posts.forEach((post) => {
    routes.push({
      route: '/' + post.slug,
      payload: post
    })
  })

  // get pages
  const pages = await api.pages.browse({
    fields: 'title,slug,id',
    limit: 'all',
    order: 'name ASC' })

  pages.forEach((page) => {
    routes.push({
      route: '/' + page.slug,
      payload: page
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

  // create author routes
  const authors = await api.authors.browse({
    fields: 'id,slug,name',
    limit: 'all'
  })

  authors.forEach((author) => {
    routes.push({
      route: '/authors/' + author.slug,
      payload: author
    })
  })

  return routes
}

const ghostAPI = () => {
  // called as function to make sure env variables are available
  return ghost(process.env.GHOST_URI, process.env.GHOST_KEY)
}

export { ghostAPI, generateRoutes }
