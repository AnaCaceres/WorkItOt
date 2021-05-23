<template>
  <div class="aboutus p-4">
    <h3 class="text-center fw-bold text-info">Hey there!</h3>
    <div class="m-5">
      <p class="text-center">
        It's Ana here, developer and creator of the
        <strong class="text-info">Work It Out!</strong> concept. I'm a
        passionate about health and fitness. I've been going to my neighborhood
        gym for two years now and I've always been pretty active.
      </p>
      <p class="text-center">
        <strong class="text-info">Work It Out!</strong> is born out of the idea
        of persuing a healthier lifestyle by our own rules.
      </p>
      <p class="text-center">
        I came with the idea of
        <strong class="text-info">Work It Out!</strong> trying to upgrade my
        game at the gym, get leaner and stronger but for that I needed
        organization. I didn't want to depend on other trainer workouts or meal
        plans, I wanted to be able to manage my own process in one place. That's
        why <strong class="text-info">Work It Out!</strong>
        has everything you need to organize your trainings, meal plans, even a
        plece qhere to track your progress and habits as well as a shopping list
        you can reach at any place.
      </p>
    </div>
    <font-awesome-icon :icon="['fas', 'dumbbell']" class="mb-5" />
    <h4 class="text-center fw-bold text-info">
      I really hope this web app cand help you reach your goals!
    </h4>
  </div>
</template>

<script>
export default {
  layout: 'login',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@200&family=Nunito+Sans:wght@300&family=Staatliches&family=Teko:wght@300&display=swap');

.aboutus {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Karla', sans-serif;
}
</style>
