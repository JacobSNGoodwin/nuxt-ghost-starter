<template>
  <section class="section">
    <div class="container">
      <h1 v-for="post in posts" :key="post.id" class="title has-text-weight-bold has-text-centered">
        This is a post of a page!
      </h1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PostPage'
}
</script>
