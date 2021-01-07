<template>
  <div class="login-layout">
    <Header />
    <Nuxt class="nuxt-login" />
  </div>
</template>

<style>
html {
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.login-layout {
  height: 100vh;
}

.nuxt-login {
  height: calc(100% - 60px);
}
</style>
