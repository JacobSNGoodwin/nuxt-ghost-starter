<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-1 has-text-centered">
        {{ siteSettings.title }}
      </h1>
      <h2 class="subtitle has-text-centered">
        {{ siteSettings.description }}
      </h2>
      <ul>
        <li v-for="post in indexPosts" :key="post.uuid">
          {{ post.title }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AuthorIndex',
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
    currentAuthor() {
      return this.$store.state.siteAuthors.find(author => author.slug === this.$route.params.slug)
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
        filter: 'author:' + params.slug,
        pageNumber: pageNumber
      })
    }
  }
}
</script>
