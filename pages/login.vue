<template>
  <div class="login">
    <Login />
  </div>
</template>

<script>
export default {
  layout: 'login',
  created() {
    if (this.$fire.auth.currentUser) this.$router.push('/trainings')
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@200&family=Nunito+Sans:wght@300&family=Staatliches&family=Teko:wght@300&display=swap');

.login {
  font-family: 'Karla', sans-serif;
  height: 100%;
}
</style>
