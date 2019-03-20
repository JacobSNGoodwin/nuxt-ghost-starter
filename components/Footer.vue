<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>nuxt-ghost-starter</strong> by <a href="https://www.jacobsngoodwin.com">Jacob Goodwin</a>
      </p>
    </div>
    <div class="content has-text-centered">
      <span class="icon is-large has-text-info">
        <a
          target="_blank"
          href="https://github.com/Maxbrain0"
          class="has-text-info"
        >
          <i class="mdi mdi-36px mdi-github-circle" />
        </a>
      </span>
      <span class="icon is-large has-text-info">
        <a
          target="_blank"
          href="https://www.linkedin.com/in/jacobgoodwin1/"
          class="has-text-info"
        >
          <i class="mdi mdi-36px mdi-linkedin" />
        </a>
      </span>
      <span class="icon is-large">
        <a
          target="_blank"
          :href="'https://www.facebook.com/' + settings.facebook"
          class="has-text-info"
        >
          <i class="mdi mdi-36px mdi-facebook" />
        </a>
      </span>
      <span class="icon is-large has-text-info">
        <a
          target="_blank"
          :href="'https://www.twitter.com/' + settings.twitter"
          class="has-text-info"
        >
          <i class="mdi mdi-36px mdi-twitter" />
        </a>
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    settings: {
      type: Object,
      required: true
    }
  }
}
</script>
