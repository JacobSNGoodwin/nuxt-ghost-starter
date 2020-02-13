import GhostContentAPI from '@tryghost/content-api'

// we have this function accept variables to be accessible to config.js
const ghost = (url, key) => {
  return new GhostContentAPI({
    url,
    key,
    version: 'v3'
  })
}

const postsPerPage = 5

const postIndexFields = [
  'id',
  'uuid',
  'title',
  'slug',
  'feature_image',
  'featured',
  'published_at',
  'custom_excerpt',
  'excerpt' // excerpt doesn't seem to work in field definition (bug?)
]

const generateRoutes = async () => {
  // need to use env set in .env file or set on your server since this is called during nuxt config
  // cannot use process.env.ghostUri which is available after config
  const host = process.env.GHOST_URI
  const key = process.env.GHOST_KEY

  const api = ghost(host, key)

  // initialize array of routes to be filled
  const routes = []

  /*
   *
   * Create post index pages (with only subset of post data)
   *
   **/
  let nextPage = 1
  do {
    const posts = await api.posts.browse({
      limit: postsPerPage,
      page: nextPage,
      fields: postIndexFields,
      include: 'authors,tags'
    })
    if (nextPage === 1) {
      // push first PER_PAGE posts info to index
      // we may want to pick a limited set of info in the future
      routes.push({
        route: '/',
        payload: posts
      })
    } else {
      routes.push({
        route: '/page/' + posts.meta.pagination.page,
        payload: posts
      })
    }
    nextPage = posts.meta.pagination.next
  } while (nextPage)

  // get posts with full post data
  // also append previous/next navigation
  const posts = await api.posts.browse({
    limit: 'all',
    include: 'authors,tags'
  })

  // append next and previous slugs (for links in a post) to next and previous posts
  const postsWithLinks = posts.map((post, index) => {
    const prevSlug = posts[index - 1] ? posts[index - 1].slug : null
    const nextSlug = posts[index + 1] ? posts[index + 1].slug : null

    return {
      ...post,
      prevSlug,
      nextSlug
    }
  })

  postsWithLinks.forEach((post) => {
    routes.push({
      route: '/' + post.slug,
      payload: post
    })
  })

  /*
   ** get pages
   */
  const pages = await api.pages.browse({
    limit: 'all',
    include: 'authors,tags'
  })

  pages.forEach((page) => {
    routes.push({
      route: '/' + page.slug,
      payload: page
    })
  })

  /*
   ** create tag index routes
   */

  const tags = await api.tags.browse({
    fields: 'name,slug,id',
    limit: 'all',
    filter: 'visibility:public'
  })

  // get route page for tag and pagination - must use for of loop
  // to work with async/await
  for (const tag of tags) {
    let nextPage = 1
    do {
      const posts = await api.posts.browse({
        limit: postsPerPage,
        page: nextPage,
        inlcude: 'authors,tags',
        filter: `tag:${tag.slug}`
      })
      if (nextPage === 1) {
        // push first PER_PAGE posts info to index
        // we may want to pick a limited set of info in the future
        routes.push({
          route: '/tag/' + tag.slug,
          payload: posts
        })
      } else {
        routes.push({
          route: '/tag/' + tag.slug + '/page/' + posts.meta.pagination.page,
          payload: posts
        })
      }
      nextPage = posts.meta.pagination.next
    } while (nextPage)
  }

  /*
   ** create author index routes
   */

  const authors = await api.authors.browse({
    fields: 'name,slug,id',
    limit: 'all'
  })

  // get route page for tag and pagination - must use for of loop
  // to work with async/await
  for (const author of authors) {
    let nextPage = 1
    do {
      const posts = await api.posts.browse({
        limit: postsPerPage,
        page: nextPage,
        inlcude: 'authors,tags',
        filter: `author:${author.slug}`
      })
      if (nextPage === 1) {
        // push first PER_PAGE posts info to index
        // we may want to pick a limited set of info in the future
        routes.push({
          route: '/author/' + author.slug,
          payload: posts
        })
      } else {
        routes.push({
          route:
            '/author/' + author.slug + '/page/' + posts.meta.pagination.page,
          payload: posts
        })
      }
      nextPage = posts.meta.pagination.next
    } while (nextPage)
  }

  return routes
}

const ghostAPI = () => {
  // called as function to make sure env variables are available
  return ghost(process.env.ghostUri, process.env.ghostKey)
}

export { ghostAPI, generateRoutes, postsPerPage, postIndexFields }
