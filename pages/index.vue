<template>
  <div class="landing bg-light">
    <div class="position-relative overflow-hidden p-3 p-md-5 w-100">
      <div class="content col-md-8 p-lg-5 my-5">
        <h1 class="display-4 text-center fw-normal">
          Ready to start your journey?
        </h1>
        <p class="text-center lead fw-normal">
          This is the place to start planning your progress.
        </p>
        <ul class="lead fw-normal p-0">
          <li class="d-flex align-items-baseline">
            <font-awesome-icon
              :icon="['fas', 'check']"
              class="me-2 text-info"
            />
            <span>Do you want to get fitter?</span>
          </li>
          <li class="d-flex align-items-baseline">
            <font-awesome-icon
              :icon="['fas', 'check']"
              class="me-2 text-info"
            />
            Do you need a place where to plan your trainings and meals?
          </li>
          <li class="d-flex align-items-baseline">
            <font-awesome-icon
              :icon="['fas', 'check']"
              class="me-2 text-info"
            />
            Do you need to track your progress or held accountable of the habits
            you said you were going to do?
          </li>
          <li class="d-flex align-items-baseline">
            <font-awesome-icon
              :icon="['fas', 'check']"
              class="me-2 text-info"
            />Do you want to achieve your goals?
          </li>
        </ul>
        <p class="text-center lead fw-bold text-info">
          Work It Out! Is the web app you've been waiting for
        </p>
        <div class="text-center">
          <nuxt-link class="btn btn-outline-dark" to="login">
            Start planning now
          </nuxt-link>
        </div>
      </div>
      <div class="product-device shadow-sm d-none d-md-block"></div>
    </div>
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

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@200&family=Nunito+Sans:wght@300&family=Staatliches&family=Teko:wght@300&display=swap');

.landing {
  overflow: auto;
  height: 100%;
  font-family: 'Karla', sans-serif;
  .position-relative {
    height: 100%;
  }
}
.product-device {
  position: absolute;
  right: 10%;
  bottom: -30%;
  width: 300px;
  height: 540px;
  background-color: #333;
  border-radius: 21px;
  transform: rotate(30deg);
}
.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}
.product-device::before {
  position: absolute;
  top: 10%;
  right: 10px;
  bottom: 10%;
  left: 10px;
  content: '';
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}
ul {
  list-style-type: none;
}
</style>
