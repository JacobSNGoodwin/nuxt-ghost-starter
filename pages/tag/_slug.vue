<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-1 has-text-centered">
        {{ currentTag.name }}
      </h1>
      <h2 class="subtitle has-text-centered">
        {{ currentTag.description }}
      </h2>
      <PostList :posts="indexPosts" :pagination="indexPagination" :index-base="'/tag/' + currentTag.slug + '/'" />
    </div>
  </section>
</template>

<script>
import PostList from '@/components/PostList.vue'
export default {
  name: 'TagIndex',
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
    },
    currentTag() {
      return this.$store.state.siteTags.find(tag => tag.slug === this.$route.params.slug)
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
        filter: 'tag:' + params.slug,
        pageNumber: pageNumber
      })
    }
  }
}
</script>
