<template>
  <div>
    <Navigation :settings="siteSettings" />
    <nuxt />
    <Footer :settings="siteSettings" />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Navigation from '@/components/Navigation.vue'
export default {
  name: 'DefaultLayout',
  components: {
    Footer,
    Navigation
  },
  head() {
    return {
      meta: [
        { hid: 'twitter:site', name: 'twitter:site', content: this.siteSettings.twitter }
      ]
    }
  },
  computed: {
    siteSettings() {
      return this.$store.state.siteSettings
    }
  }
}
</script>
