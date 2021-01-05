<template>
  <div class="header">
    <nuxt-link to="/" tag="div" class="logo">
      <h1>Work It Out!</h1>
    </nuxt-link>
    <div class="buttons">
      <div v-if="loggedIn" @click="logout">Log Out</div>
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
        await this.$store.dispatch('onAuthStateChanged', user)
        this.$router.push('/login')
      })
    },
  },
}
</script>

<style scoped>
div {
  font-family: 'Staatliches', cursive;
  background-color: #f0f3f4;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.logo {
  width: 70%;
  margin-left: 3%;
  display: flex;
  justify-content: flex-start;
}
h1 {
  cursor: pointer;
}

.buttons {
  width: 30%;
}
</style>
