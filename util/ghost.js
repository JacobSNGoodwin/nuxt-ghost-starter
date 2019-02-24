import GhostContentAPI from '@tryghost/content-api'

// we have this function accept variables to be accessible to config.js
const ghostAPI = (host, key) => {
  return new GhostContentAPI({
    host: host,
    key: key,
    version: 'v2'
  })
}

const generateRoutes = () => {
  const host = process.env.GHOST_URI
  const key = process.env.GHOST_KEY

  const api = ghostAPI(host, key)

  // consider chaining or using async await go generate pages and tags routes
  // before returning final array
  return api.posts.browse({ fields: 'slug,id' }).then((posts) => {
    return posts.map((post) => {
      return '/posts/' + post.slug
    })
  }).catch((err) => {
    console.log(err)
  })
}

export { ghostAPI, generateRoutes }
