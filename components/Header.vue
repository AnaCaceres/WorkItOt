<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
      <nuxt-link to="/" tag="div" class="logo navbar-brand">
        <img src="../assets/logo_transparent.png" alt="Work It Out! Logo" />
      </nuxt-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarToggler" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <template v-if="!loggedIn">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="aboutus">
                <div data-bs-toggle="collapse" data-bs-target="#navbarToggler">
                  About Us
                </div>
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="login">
                <div data-bs-toggle="collapse" data-bs-target="#navbarToggler">
                  Log In
                </div>
              </nuxt-link>
            </li>
          </template>
          <li v-else-if="landing" class="nav-item d-none d-md-inline">
            <nuxt-link class="nav-link" to="trainings">
              <div data-bs-toggle="collapse" data-bs-target="#navbarToggler">
                Go to app
              </div>
            </nuxt-link>
          </li>
        </ul>
        <Navbar v-if="loggedIn" class="nav d-lg-none mt-2 rounded" />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    landing: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    loggedIn() {
      return this.$fire.auth.currentUser
    },
  },
}
</script>

<style scoped>
div {
  font-family: 'Staatliches', cursive;
}
.logo img {
  cursor: pointer;
  width: 12rem;
  height: 2rem;
  object-fit: cover;
}
</style>
