<template>
  <div class="header">
    <nuxt-link to="/" tag="div" class="logo">
      <!--<h1>Work It Out!</h1>-->
      <img src="../assets/logo_transparent.png" alt="Work It Out! Logo" />
    </nuxt-link>
    <div class="buttons">
      <nuxt-link to="aboutus" tag="div">About Us</nuxt-link>
      <div v-if="loggedIn" @click="logout">Log Out</div>
      <nuxt-link v-else to="login" tag="div">Log In</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.state.authenticated
    },
  },
  methods: {
    logout() {
      this.$fire.auth.signOut().then(async (user) => {
        await this.$store.dispatch('logOut')
        this.$router.push('/login')
      })
    },
  },
}
</script>

<style scoped>
div {
  font-family: 'Staatliches', cursive;
  background-color: #000000;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.logo {
  width: 75%;
  display: flex;
  justify-content: flex-start;
}
img {
  cursor: pointer;
  width: 35%;
}

.buttons {
  width: 25%;
  color: #ffffff;
}

.buttons div {
  cursor: pointer;
}
</style>
