<template>
  <div class="training">
    <calendar class="training-calendar" />
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'
export default {
  components: { Calendar },
  middleware: 'authenticated',
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@200&family=Nunito+Sans:wght@300&family=Staatliches&family=Teko:wght@300&display=swap');

.training {
  font-family: 'Karla', sans-serif;
  overflow-y: auto;
  width: 100%;
  .training-calendar {
    width: 100%;
  }
}
</style>
