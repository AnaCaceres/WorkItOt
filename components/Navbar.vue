<template>
  <div class="navbar">
    <div class="links">
      <nuxt-link to="/" tag="a" class="link">Training calendar</nuxt-link>
      <nuxt-link to="/" tag="a" class="link">Habit tracker</nuxt-link>
      <nuxt-link to="/" tag="a" class="link">Meal planning</nuxt-link>
    </div>
    <div class="settings">
      <nuxt-link to="/" tag="a" class="link">
        <font-awesome-icon :icon="['fas', 'user-cog']" />
        <p>Settings</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.navbar {
  font-family: 'Staatliches', cursive;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #eee;
}

.links,
.settings {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.links {
  margin: 10% 0;
}

.link {
  margin: 10% 0;
  text-decoration: none;
  color: #000;
  display: flex;
  justify-content: center;
}

.settings {
  width: 100%;
  background-color: #000;
}

.settings .link {
  color: #fff;
  align-items: stretch;
}

p {
  margin: 0 5%;
}
</style>
