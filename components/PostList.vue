<template>
  <div>
    <nuxt-link v-for="post in posts" :key="post.id" :to="'/' + post.slug">
      <div class="card">
        <div v-if="post.feature_image" class="card-image">
          <figure class="image">
            <img :src="post.feature_image" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">
                Jacob Goodwin
              </p>
              <p class="subtitle is-6">
                Published on
              </p>
              <p>Tags Here</p>
            </div>
          </div>
          <div class="content">
            <h3 class="is-title has-text-centered">
              {{ post.title }}
            </h3>
            <p v-if="post.custom_excerpt" class="has-text-centered">
              {{ post.custom_excerpt }}
            </p>
            <p v-else-if="post.excerpt && !post.custom_excerpt" class="has-text-centered">
              {{ post.excerpt }}...
            </p>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
  .column {
    flex-wrap: wrap
  }

  .card {
    margin: 1.5em 0 1.5em 0;
  }
</style>
