<template>
  <div class="training">
    <calendar
      class="training-calendar"
      :attributes="attributes"
      @update="update"
    />
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'
export default {
  components: { Calendar },
  middleware: 'authenticated',
  data: () => ({
    attributes: [],
  }),
  mounted() {
    this.update()
  },
  methods: {
    update() {
      this.attributes = []
      this.$fire.firestore
        .collection('trainings')
        .where('userID', '==', this.$fire.auth.currentUser.uid)
        .get()
        .then((results) => {
          results.forEach((doc) => {
            this.attributes.push({
              docId: doc.id,
              customData: {
                title: doc.data().name,
                description: doc.data().description,
                video: doc.data().video,
                date: doc.data().date,
              },
              dates: new Date(doc.data().date.seconds * 1000),
            })
          })
        })
    },
  },
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
