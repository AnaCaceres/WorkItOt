<template>
  <div class="default">
    <Header />
    <div class="page">
      <a href="#" class="arrow" :class="{ border: isToggled }" @click="toggle">
        <font-awesome-icon
          v-if="isToggled"
          :icon="['fas', 'arrow-circle-right']"
          class="icon"
        />
        <font-awesome-icon
          v-else
          :icon="['fas', 'arrow-circle-left']"
          class="icon"
        />
      </a>
      <Navbar class="navbar-layout" :class="{ toggled: isToggled }" />
      <Nuxt class="nuxt" :class="{ toggled: isToggled }" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isToggled: false,
    }
  },
  methods: {
    toggle() {
      this.isToggled = !this.isToggled
    },
  },
}
</script>

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

.default {
  height: 100vh;
}

.page {
  height: calc(100% - 60px);
  width: 100%;
  display: flex;
  align-items: stretch;
  position: relative;
}

.nuxt {
  width: 100%;
  flex-basis: auto;
  transition: all 0.5s linear;
}

.nuxt.toggled {
  transition: all 0.25s linear;
  flex-basis: auto;
}

.navbar-layout.toggled {
  transition: opacity 0.25s linear, min-width 0.5s linear;
  opacity: 0;
  max-width: 0%;
  min-width: 0%;
}

.arrow.border {
  transform: translateX(-14vw);
}

.navbar-layout {
  height: 100%;
  transition: opacity 0.5s 0.25s linear, min-width 0.5s linear;
  min-width: 15%;
}

.arrow {
  position: absolute;
  left: 14%;
  top: calc(100% / 2);
  color: #000;
  transition: transform 0.5s linear;
  z-index: 5;
  font-size: 25px;
}
</style>
