<template>
  <div>
    <nuxt-link v-for="post in posts" :key="post.id" :to="'/' + post.slug">
      <div class="card">
        <div v-if="post.feature_image" class="card-image">
          <figure class="image">
            <img :src="post.feature_image" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            <h3 class="is-title has-text-centered">
              {{ post.title }}
            </h3>
            <p class="subtitle is-6 has-text-centered">
              Published on {{ post.published_at | formatDate }}
            </p>
          </div>
          <div v-for="author in post.authors" :key="author.id">
            <nuxt-link :to="'/author/' + author.slug">
              <figure class="image is-96x96">
                <img :src="author.profile_image" alt="Author image" class="is-rounded">
              </figure>
            </nuxt-link>
            <p class="title is-5 has-text-centered">
              <nuxt-link :to="'/author/' + author.slug">
                {{ author.name }}
              </nuxt-link>
            </p>
          </div>
          <div class="content">
            <div class="buttons is-centered">
              <nuxt-link v-for="tag in post.tags" :key="tag.id" :to="'/tag/' + tag.slug" class="button is-primary">
                {{ tag.name }}
              </nuxt-link>
            </div>
            <p v-if="post.custom_excerpt" class="has-text-centered">
              {{ post.custom_excerpt }}
            </p>
            <p v-else-if="post.excerpt && !post.custom_excerpt" class="has-text-centered">
              <!-- Seems to be an issue with getting excerpt via content api client -->
              {{ post.excerpt }}...
            </p>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
  .column {
    flex-wrap: wrap
  }

  .card {
    margin: 1.5em 0 1.5em 0;
  }

  figure {
    margin: 1em auto;
  }

  .content {
    margin-top: 1em;
  }
</style>
