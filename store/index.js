import { ghostAPI, indexPostFields, postsPerPage } from '@/util/ghost'

export const state = () => ({
  postNav: [],
  indexPosts: [],
  indexPagination: [],
  currentPost: null,
  siteSettings: null,
  siteTags: null,
  siteAuthors: null
})

export const mutations = {
  setPostNav(state, postNav) {
    state.postNav = postNav
  },
  setIndexPosts(state, indexPosts) {
    state.indexPosts = indexPosts
    state.indexPagination = indexPosts.meta.pagination
  },
  setCurrentPost(state, currentPost) {
    state.currentPost = currentPost
  },
  setSiteSettings(state, siteSettings) {
    state.siteSettings = siteSettings
  },
  setSiteTags(state, siteTags) {
    state.siteTags = siteTags
  },
  setSiteAuthors(state, siteAuthors) {
    state.siteAuthors = siteAuthors
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    // get site settings, and whether or not posts have a previous or next post
    // use this for both static and universal apps
    const posts = await ghostAPI().posts.browse({
      limit: 'all',
      fields: 'slug,title'
    })

    const tags = await ghostAPI().tags.browse({ limit: 'all' })
    const authors = await ghostAPI().authors.browse({ limit: 'all' })

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

    const settings = await ghostAPI().settings.browse()

    commit('setPostNav', postsWithLinks)
    commit('setSiteSettings', settings)
    commit('setSiteTags', tags)
    commit('setSiteAuthors', authors)
  },
  async getIndexPosts({ commit }, pagination) {
    // set desired fields for index lists (and tags/authors indices)

    const posts = await ghostAPI().posts.browse({
      limit: postsPerPage,
      page: pagination.pageNumber,
      inlcude: 'authors,tags',
      fields: indexPostFields,
      filter: pagination.filter
    })

    commit('setIndexPosts', posts)
  },
  async getCurrentPost({ commit, state }, slug) {
    // if not in posts links, look in page links
    const postLinks = state.postNav.find(post => post.slug === slug)

    if (!postLinks) {
      // if it's not in lists of posts check for page
      // TODO: catch errors
      const page = await ghostAPI().pages.read({
        slug,
        include: 'authors, tags'
      })

      commit('setCurrentPost', page)
    } else {
      const post = await ghostAPI().posts.read({
        slug,
        include: 'authors,tags'
      })

      commit('setCurrentPost', {
        ...post,
        prevSlug: postLinks.prevSlug,
        nextSlug: postLinks.nextSlug
      })
    }
  }
}
