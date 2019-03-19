<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-weight-bold has-text-centered has-text-primary">
        {{ post.title }}
      </h1>
      <figure v-if="post.feature_image" class="image post-feature-image">
        <img :src="post.feature_image" alt="Post Image">
      </figure>
      <div class="content" v-html="post.html" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'PostPage',
  computed: {
    post() {
      return this.$store.state.currentPost
    }
  },
  async fetch({ params, store, error, payload }) {
    if (payload) {
      store.commit('setCurrentPost', payload)
    } else {
      // remember to use await here so data will be available
      await store.dispatch('getCurrentPost', params.slug)
    }
  }
}
</script>
