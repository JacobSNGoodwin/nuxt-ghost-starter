<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404" class="title is-1 has-text-centered">
      Page not found
    </h1>
    <h1 v-else class="title is-1 has-text-centered">
      An error occurred
    </h1>
    <div class="buttons is-centered">
      <nuxt-link to="/" tag="button" class="button is-info">
        Home page
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
  .container {
    margin-top: 2em;
    margin-bottom: 2em;
  }
</style>
