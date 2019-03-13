
<template>
  <section class="section">
    <div class="container">
      <h1>
        Index page number: {{ $route.params.id }}
      </h1>
      <nuxt-link to="/">
        Back Home Baby
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PostList'
}
</script>
