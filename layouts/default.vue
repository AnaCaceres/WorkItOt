<template>
  <div class="default d-flex flex-column">
    <Header />
    <div class="content d-flex flex-fill">
      <Navbar class="nav d-none d-lg-flex" />
      <Nuxt class="nuxt d-flex flex-column" />
    </div>
  </div>
</template>

<style lang="scss">
.default {
  height: 100%;
  .content {
    overflow: hidden;
    .nav {
      min-width: 20%;
    }
  }
}
</style>
