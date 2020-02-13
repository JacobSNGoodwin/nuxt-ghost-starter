<template>
  <nav
    class="navbar is-transparent"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" to="/">
        <img :src="settings.logo" alt="Site Logo" />
      </nuxt-link>
      <a
        :class="{ 'navbar-burger': true, 'is-active': mobileNavOpen }"
        role="button"
        aria-label="menu"
        @click="mobileNavOpen = !mobileNavOpen"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div :class="{ 'navbar-menu': true, 'is-active': mobileNavOpen }">
      <div class="navbar-end" @click="mobileNavOpen = false">
        <nuxt-link
          v-for="navItem in settings.navigation"
          :key="navItem.label"
          :to="navItem.url"
          class="navbar-item"
        >
          {{ navItem.label }}
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      mobileNavOpen: false
    }
  }
}
</script>

<style scoped>
a.navbar-item {
  font-weight: 500;
}

.navbar-menu {
  padding-right: 1em;
}
</style>
