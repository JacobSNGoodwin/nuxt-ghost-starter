<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-weight-bold has-text-centered has-text-primary">
        {{ post.title }}
      </h1>
    </div>
  </section>
</template>

<script>
import { ghostAPI } from '@/util/ghost'
export default {
  name: 'PostPage',
  // computed: {
  //   currentPost(params) {
  //     return params
  //   }
  // },
  async asyncData({ params, store, error, payload }) {
    if (payload) {
      return {
        post: payload
      }
    } else {
      // need to add catch if page doesn't exist at some point
      // maybe set in vuex and get next prev links
      const post = await ghostAPI().posts.read({
        slug: params.post,
        include: 'authors,tags'
      })
      return {
        post: post
      }
    }
  }
}
</script>
