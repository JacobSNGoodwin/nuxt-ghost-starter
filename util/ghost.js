import GhostContentAPI from '@tryghost/content-api'

// we have this function accept variables to be accessible to config.js
const ghostAPI = (host, key) => {
  return new GhostContentAPI({
    host,
    key,
    version: 'v2'
  })
}

const generateRoutes = (host, key) => {
  const api = ghostAPI(host, key)
  return api.posts.browse({ fields: 'slug,id' }).then((posts) => {
    return posts.map((post) => {
      return '/posts/' + post.id
    })
  }).catch((err) => {
    console.log(err)
  })
}

export { generateRoutes }
