<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-weight-bold has-text-centered">
        nuxt-jsng
      </h1>
      <h2 class="has-text-centered is-size-3">
        A subtitle
      </h2>
    </div>
  </section>
</template>

<script>
import api from '@/util/ghost.js'

export default {
  name: 'PostIndex',
  async asyncData() {
    const data = await api.posts.browse({ limit: 5 })

    return {
      data
    }
  }
}
</script>
