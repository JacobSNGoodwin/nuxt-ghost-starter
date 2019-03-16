<template>
  <div>
    <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item" to="/">
            <img :src="siteSettings.logo" alt="Site Logo">
          </nuxt-link>
          <a
            role="button"
            :class="{'navbar-burger': true, 'is-active': mobileNavOpen}"
            aria-label="menu"
            @click="mobileNavOpen = !mobileNavOpen"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div :class="{'navbar-menu': true, 'is-active': mobileNavOpen }">
          <div
            class="navbar-end"
            @click="mobileNavOpen=false"
          >
            <nuxt-link
              v-for="navItem in siteSettings.navigation"
              :key="navItem.label"
              :to="navItem.url"
              class="navbar-item"
            >
              {{ navItem.label }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>
    <nuxt />
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
            :href="'https://www.facebook.com/' + siteSettings.facebook"
            class="has-text-info"
          >
            <i class="mdi mdi-36px mdi-facebook" />
          </a>
        </span>
        <span class="icon is-large has-text-info">
          <a
            target="_blank"
            :href="'https://www.twitter.com/' + siteSettings.twitter"
            class="has-text-info"
          >
            <i class="mdi mdi-36px mdi-twitter" />
          </a>
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      mobileNavOpen: false
    }
  },
  computed: {
    siteSettings() {
      return this.$store.state.siteSettings
    }
  }
}
</script>

<style scoped>
  a.navbar-item {
    font-weight: 500;
  }
</style>
