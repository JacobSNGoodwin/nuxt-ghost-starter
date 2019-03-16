<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-1 has-text-centered">
        {{ siteSettings.title }}
      </h1>
      <h2 class="subtitle has-text-centered">
        {{ siteSettings.description }}
      </h2>
      <PostList :posts="indexPosts" />
    </div>
  </section>
</template>

<script>
import PostList from '@/components/PostList.vue'
export default {
  name: 'PostIndex',
  components: {
    PostList
  },
  computed: {
    indexPosts() {
      return this.$store.state.indexPosts
    },
    indexPagination() {
      return this.$store.state.indexPagination
    },
    siteSettings() {
      return this.$store.state.siteSettings
    }
  },
  async fetch({ params, store, error, payload }) {
    if (payload) {
      store.commit('setIndexPosts', payload)
    } else {
      let pageNumber = 1
      if (params.pageNumber) {
        pageNumber = params.pageNumber
      }
      // remember to use await here so data will be available
      await store.dispatch('getIndexPosts', {
        filter: '',
        pageNumber: pageNumber
      })
    }
  }
}
</script>
