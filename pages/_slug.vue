<template>
  <section class="section">
    <div class="container post-container">
      <h1 class="title has-text-weight-bold has-text-centered has-text-primary">
        {{ post.title }}
      </h1>
      <figure v-if="post.feature_image" class="post-feature-image">
        <img :src="post.feature_image" alt="Post Image">
      </figure>
      <article ref="postContent" class="content post-content" v-html="post.html" />
    </div>
  </section>
</template>

<script>
import { ghostAPI } from '@/util/ghost'
export default {
  name: 'PostPage',
  computed: {
    post() {
      return this.$store.state.currentPost
    }
  },
  head() {
    return {
      title: this.post.title
    }
  },
  async fetch({ params, store, error, payload }) {
    if (payload) {
      store.commit('setCurrentPost', payload)
    } else {
      // remember to use await here so data will be available
      // await store.dispatch('getCurrentPost', params.slug)
      const postLinks = store.state.postNav.find(post => post.slug === params.slug)

      if (!postLinks) {
      // if it's not in lists of posts check for page
      // TODO: catch errors
        try {
          const page = await ghostAPI().pages.read({
            slug: params.slug,
            include: 'tags,authors'
          })
          store.commit('setCurrentPost', page)
        } catch (e) {
          // forward error - just call all errors 404
          // since user doesn't need to know about content API
          error({ statusCode: 404, message: e.message })
        }
      } else {
        try {
          const post = await ghostAPI().posts.read({
            slug: params.slug,
            include: 'tags,authors'
          })

          store.commit('setCurrentPost', {
            ...post,
            prevSlug: postLinks.prevSlug,
            nextSlug: postLinks.nextSlug
          })
        } catch (e) {
          error({ statusCode: 404, message: e.message })
        }
      }
    }
  },
  mounted() {
    // ghetto way of overcoming iFrame height "challenge/annoyance"
    const cards = document.getElementsByClassName('kg-embed-card')
    for (const card of cards) {
      const iframe = card.firstElementChild
      const iframeHeight = iframe.getAttribute('height')
      if (iframeHeight) {
        iframe.style.height = iframeHeight + 'px'
      }
    }
  }
}
</script>

<style lang="scss">
.post-container {
  display: flex;
  flex-direction: column;

  .post-feature-image {
    align-self: center;
    margin-bottom: 2em;
    img {
      max-width: 100vw;
    }
  }

}

.post-content {
  display: flex;
  flex-direction: column;

  .instagram-media, .instagram-media-rendered {
    margin: auto !important;
  }

  .kg-image-card {
    align-self: center;
    .kg-image {
      max-width: 75vw;
    }
    figcaption {
      padding: 0 2em;
    }
  }

  .kg-width-wide {
    .kg-image {
      max-width: 85vw;
    }
  }

  .kg-width-full {
    .kg-image {
      max-width: 100vw;
    }
  }

  p {
    align-self: center;
    img {
      display: block;
      margin: 1em auto;
      max-width: 100vw;
    }
  }
}
</style>
