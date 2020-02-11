<template>
  <div class="error-container">
    <h1 class="title is-1 has-text-centered">
      Page not found
    </h1>
    <div class="buttons is-centered">
      <nuxt-link to="/" tag="a" class="button is-info">
        Home
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.error-container {
  margin-top: 2em;
  margin-bottom: 2em;
}
</style>
