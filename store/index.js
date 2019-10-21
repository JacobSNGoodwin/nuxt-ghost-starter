import { ghostAPI, postsPerPage, postIndexFields } from '@/util/ghost'

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
  async nuxtServerInit({ commit }, { error }) {
    // get site settings, and whether or not posts have a previous or next post
    // use this for both static and universal apps
    try {
      const settings = await ghostAPI().settings.browse()
      const tags = await ghostAPI().tags.browse({ limit: 'all' })
      const authors = await ghostAPI().authors.browse({ limit: 'all' })
      const posts = await ghostAPI().posts.browse({
        limit: 'all',
        fields: 'slug,title'
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

      commit('setSiteSettings', settings)
      commit('setSiteTags', tags)
      commit('setSiteAuthors', authors)
      commit('setPostNav', postsWithLinks)
    } catch (e) {
      // since this is server init, the error would be a server error
      error({ statusCode: 500, message: e.message })
      throw e
    }
  },
  async getIndexPosts({ commit }, pagination) {
    // set desired fields for index lists (and tags/authors indices)
    const posts = await ghostAPI().posts.browse({
      limit: postsPerPage,
      page: pagination.pageNumber,
      include: 'tags,authors',
      fields: postIndexFields,
      filter: pagination.filter
    })
    commit('setIndexPosts', posts)
  }
}
