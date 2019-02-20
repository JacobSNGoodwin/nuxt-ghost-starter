<template>
  <section class="section">
    <div class="container">
      <h1 v-for="post in posts" :key="post.id" class="title has-text-weight-bold has-text-centered">
        {{ post.title }}
      </h1>
    </div>
  </section>
</template>

<script>
import api from '@/util/ghost.js'

export default {
  name: 'PostIndex',
  async asyncData() {
    const posts = await api.posts.browse({ limit: 5, fields: 'title,custom_excerpt,url,id', include: 'tags,authors' })

    return {
      posts
    }
  }
}
</script>
