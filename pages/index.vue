<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-1 has-text-primary has-text-centered">
        The Greatest Home Page Ever
      </h1>
      <h3 v-for="post in posts" :key="post.id">
        {{ post.title }}
      </h3>
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
      limit: 2,
      fields: 'title, slug, id',
      order: 'published_at DESC',
      include: 'tags,authors'
    })

    console.log(posts)
    return {
      posts
    }
  }
}
</script>
