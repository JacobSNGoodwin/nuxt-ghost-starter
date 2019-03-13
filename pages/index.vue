<template>
  <section class="section">
    <div class="container">
      <h1 v-for="post in posts" :key="post.id">
        {{ post.title }}
      </h1>
      <nuxt-link to="page/2">
        Page 2!
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { ghostAPI } from '@/util/ghost'
export default {
  name: 'PostIndex',
  async asyncData() {
    const posts = await ghostAPI().posts.browse({
      limit: 5,
      order: 'published_at DESC',
      include: 'tags,authors'
    })
    return {
      posts
    }
  }
}
</script>
