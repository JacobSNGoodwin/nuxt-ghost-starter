<template>
  <section class="section">
    <div class="container">
      <h1>Home Page</h1>
    </div>
  </section>
</template>

<script>
import { ghostAPI } from '@/util/ghost'
export default {
  name: 'PostIndex',
  async asyncData() {
    const posts = await ghostAPI().posts.browse({
      fields: 'title,slug,id',
      limit: 'all',
      order: 'published_at DESC'
    })
    return {
      posts
    }
  }
}
</script>
