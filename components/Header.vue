<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
        <ul v-if="!loggedIn" class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="aboutus">About Us</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="login">Log In</nuxt-link>
          </li>
        </ul>
        <Navbar v-else class="nav d-lg-none mt-2 rounded" />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
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
