<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>nuxt-ghost-starter</strong> by
        <a href="https://www.jacobgoodwin.me">Jacob Goodwin</a>
      </p>
    </div>
    <div class="content has-text-centered">
      <a target="_blank" href="https://github.com/JacobSNGoodwin" class="">
        <Github class="social-icon" viewbox="0 0 24 24" />
      </a>

      <a
        target="_blank"
        href="https://www.linkedin.com/in/jacobgoodwin1/"
        class=""
      >
        <LinkedIn class="social-icon" viewbox="0 0 24 24" />
      </a>

      <a
        :href="'https://www.facebook.com/' + settings.facebook"
        target="_blank"
        class=""
      >
        <Facebook class="social-icon" viewbox="0 0 24 24" />
      </a>

      <a
        :href="'https://www.twitter.com/' + settings.twitter"
        target="_blank"
        class=""
      >
        <Twitter class="social-icon" viewbox="0 0 24 24" />
      </a>
    </div>
  </footer>
</template>

<script>
import LinkedIn from '@mdi/svg/svg/linkedin.svg'
import Github from '@mdi/svg/svg/github-circle.svg'
import Facebook from '@mdi/svg/svg/facebook.svg'
import Twitter from '@mdi/svg/svg/twitter.svg'

export default {
  components: {
    LinkedIn,
    Github,
    Facebook,
    Twitter
  },
  props: {
    settings: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.social-icon {
  fill: $info;
  width: 36px;
  height: 36px;
  transition: fill 0.2s ease;

  &:hover {
    fill: $primary;
  }
}
</style>
