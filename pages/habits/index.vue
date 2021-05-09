<template>
  <div class="habits p-4">
    <h2>Habit Tracker</h2>
    <div class="d-flex justify-content-end">
      <button
        class="btn btn-info text-white"
        data-bs-toggle="modal"
        data-bs-target="#formModal"
      >
        Add new habit
      </button>
      <div
        id="formModal"
        class="modal modal-fullscreen-sm-down fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 id="exampleModalLabel" class="modal-title">New habit</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="habitName" class="form-label">Name</label>
                <input
                  id="habitName"
                  v-model="habitName"
                  type="text"
                  class="form-control"
                  aria-describedby="habitName"
                />
              </div>
              <div class="mb-3">
                <h6>Week days</h6>
                <input
                  id="monday"
                  v-model="checkedWeekDays"
                  class="form-check-input"
                  type="checkbox"
                  value="1"
                />
                <label class="form-check-label" for="monday"> Monday </label>
                <div class="form-check">
                  <input
                    id="tuesday"
                    v-model="checkedWeekDays"
                    class="form-check-input"
                    type="checkbox"
                    value="2"
                  />
                  <label class="form-check-label" for="tuesday">
                    Tuesday
                  </label>
                </div>
                <div class="form-check">
                  <input
                    id="wednesday"
                    v-model="checkedWeekDays"
                    class="form-check-input"
                    type="checkbox"
                    value="3"
                  />
                  <label class="form-check-label" for="wednesday">
                    Wednesday
                  </label>
                </div>
                <div class="form-check">
                  <input
                    id="thursday"
                    v-model="checkedWeekDays"
                    class="form-check-input"
                    type="checkbox"
                    value="4"
                  />
                  <label class="form-check-label" for="thursday">
                    Thursday
                  </label>
                </div>
                <div class="form-check">
                  <input
                    id="friday"
                    v-model="checkedWeekDays"
                    class="form-check-input"
                    type="checkbox"
                    value="5"
                  />
                  <label class="form-check-label" for="friday"> Friday </label>
                </div>
                <div class="form-check">
                  <input
                    id="saturday"
                    v-model="checkedWeekDays"
                    class="form-check-input"
                    type="checkbox"
                    value="6"
                  />
                  <label class="form-check-label" for="saturday">
                    Saturday
                  </label>
                </div>
                <div class="form-check">
                  <input
                    id="sunday"
                    v-model="checkedWeekDays"
                    class="form-check-input"
                    type="checkbox"
                    value="0"
                  />
                  <label class="form-check-label" for="sunday"> Sunday </label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-info text-white"
                data-bs-dismiss="modal"
                @click="addHabit"
              >
                Add new habit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h4>Today's habits</h4>
      <ul class="list-group">
        <li v-for="(habit, i) in habits" :key="i" class="list-group-item">
          <input
            :id="habit.name + i"
            v-model="accomplishedToday"
            class="form-check-input"
            type="checkbox"
            :value="habit.name"
          />
          <label class="form-check-label" for="monday">
            {{ habit.name }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data: () => ({
    today: new Date(),
    currentMonth: null,
    currentYear: null,
    habits: [],
    checkedWeekDays: [],
    accomplishedToday: [],
    habitName: '',
  }),
  computed: {
    todaysHabits() {
      const todaysHabits = []
      this.habits.forEach((habit) => {
        if (habit.weekDays.includes(this.today.getDay().toString())) {
          todaysHabits.push(habit)
        }
      })
      return todaysHabits
    },
  },
  created() {
    this.currentMonth = this.today.getMonth()
    this.currentYear = this.today.getFullYear()
    this.update()
  },
  methods: {
    addHabit() {
      const newHabit = {
        userID: this.$fire.auth.currentUser.uid,
        weekDays: this.checkedWeekDays,
        name: this.habitName,
        accomplished: [],
      }
      this.habits.unshift(newHabit)
      this.$fire.firestore.collection('habits').add(newHabit)
      this.weekDays = ''
      this.habitName = ''
    },
    update() {
      this.habits = []
      this.$fire.firestore
        .collection('habits')
        .where('userID', '==', this.$fire.auth.currentUser.uid)
        .get()
        .then((results) => {
          results.forEach((doc) => {
            this.habits.push(doc.data())
          })
        })
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@200&family=Nunito+Sans:wght@300&family=Staatliches&family=Teko:wght@300&display=swap');

.habits {
  font-family: 'Karla', sans-serif;
  overflow-y: auto;
  width: 100%;
}
</style>
