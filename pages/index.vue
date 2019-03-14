<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-1 has-text-primary has-text-centered">
        The Greatest Home Page Ever
      </h1>
      <h3 v-for="post in posts" :key="post.id">
        {{ post.title }}
      </h3>
    </div>
  </section>
</template>

<script>
import { ghostAPI } from '@/util/ghost'
export default {
  name: 'PostIndex',
  async asyncData({ params, error, payload }) {
    if (payload) {
      return {
        posts: payload,
        pagination: payload.meta.pagination
      }
    } else {
      const posts = await ghostAPI().posts.browse({
        limit: process.env.POSTS_PER_PAGE,
        order: 'published_at DESC'
      })
      return {
        posts,
        pagination: posts.meta.pagination
      }
    }
  }
}
</script>
