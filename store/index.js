import { ghostAPI, indexPostFields } from '@/util/ghost'

export const state = () => ({
  postNav: [],
  indexPosts: [],
  siteSettings: {}
})

export const mutations = {
  setPostNav(state, postNav) {
    state.postNav = postNav
  },
  setIndexPosts(state, indexPosts) {
    state.indexPosts = indexPosts
    // console.log(state.indexPosts)
  },
  setSiteSettings(state, siteSettings) {
    state.siteSettings = siteSettings
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
  },
  async getIndexPosts({ commit }, pagination) {
    // set desired fields for index lists (and tags/authors indeces)
    const posts = await ghostAPI().posts.browse({
      limit: process.env.POSTS_PER_PAGE,
      page: pagination.pageNumber,
      inlcude: 'authors,tags',
      fields: indexPostFields
    })

    commit('setIndexPosts', posts)
  }
}
