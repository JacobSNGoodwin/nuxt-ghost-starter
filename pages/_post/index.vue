<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-weight-bold has-text-centered">
        Post Slug - {{ post }}
      </h1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Post',
  asyncData({ params }) {
    const post = params.post
    return {
      post
    }
  }
}
</script>
