<template>
  <div class="habits p-4">
    <h2>Habit Tracker</h2>
    <div class="my-3">
      <h4>Today's habits</h4>
      <ul class="list-group">
        <li
          v-for="habit in todaysHabits"
          :key="habit.docID"
          class="list-group-item"
        >
          <input
            :id="habit.docID"
            v-model="accomplishedToday"
            class="form-check-input"
            type="checkbox"
            :value="habit.docID"
          />
          <label class="form-check-label" for="monday">
            {{ habit.name }}
          </label>
        </li>
      </ul>
    </div>
    <div class="mb-3 table-responsive">
      <h4>This month</h4>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Habit</th>
            <th v-for="day in thisMonthDays" :key="day" scope="col">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(habit, i) in habits" :key="i">
            <th scope="row">{{ habit.name }}</th>
            <td
              v-for="day in thisMonthDays"
              :key="day"
              :class="{ 'bg-light': !getIcon(habit, day) }"
            >
              <font-awesome-icon
                v-if="getIcon(habit, day)"
                :icon="['fas', getIcon(habit, day)]"
                :class="getIcon(habit, day)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-end">
      <button
        class="btn btn-info text-white mx-2"
        data-bs-toggle="modal"
        data-bs-target="#formModal"
      >
        <font-awesome-icon :icon="['fas', 'plus']" class="me-2" />
        Add new habit
      </button>
      <button
        class="btn btn-info text-white mx-2"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
      >
        <font-awesome-icon :icon="['fas', 'pencil-alt']" class="me-2" />
        Edit habits
      </button>
      <div
        id="formModal"
        class="modal modal-fullscreen-sm-down fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 v-if="updated" id="updateModalLabel" class="modal-title">
                Update habit
              </h5>
              <h5 v-else id="addModalLabel" class="modal-title">New habit</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="cleanUpdate"
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
                  class="form-check-input text-info"
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
                v-if="updated"
                type="button"
                class="btn btn-info text-white"
                data-bs-target="#infoModal"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                @click="updateHabit()"
              >
                Save
              </button>
              <button
                v-else
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
      <div
        id="editModal"
        class="modal modal-fullscreen-sm-down fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="editModal"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 id="exampleModalLabel" class="modal-title">List of habits</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="cleanUpdate"
              ></button>
            </div>
            <div class="modal-body">
              <div
                v-for="habit in habits"
                :key="habit.docID"
                class="mb-3 p-2 bg-light rounded"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <h4>{{ habit.name }}</h4>
                  <span>
                    <font-awesome-icon
                      :icon="['fas', 'pencil-alt']"
                      class="edit me-2"
                      data-bs-target="#formModal"
                      data-bs-toggle="modal"
                      data-bs-dismiss="modal"
                      data-bs-update="update"
                      @click="updateHabitModal(habit)"
                    />
                    <font-awesome-icon
                      :icon="['fas', 'trash-alt']"
                      class="trash me-2"
                      @click="deleteHabit(habit)"
                    />
                  </span>
                </div>
                <div class="d-flex flex-wrap">
                  <b class="me-2">Week days: </b>
                  <span v-for="day in habit.weekDays" :key="day" class="me-2">
                    {{ getDay(day) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    accomplishedToday: [],
    checkedWeekDays: [],
    habitName: '',
    updateHabitId: '',
    updated: false,
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
    thisMonthDays() {
      return new Date(this.currentYear, this.currentMonth, 0).getDate()
    },
  },
  watch: {
    accomplishedToday(val) {
      this.habits.forEach((habit) => {
        if (val.includes(habit.docID)) {
          let habitExistsToday = false
          habit.accomplished.forEach((time) => {
            if (time === this.today.getTime()) {
              habitExistsToday = true
            }
          })
          if (!habitExistsToday) {
            habit.accomplished.push(this.today.getTime())
          }
        } else {
          habit.accomplished.forEach((time, i) => {
            if (time === this.today.getTime()) {
              habit.accomplished.splice(i, 1)
            }
          })
        }
        const todayHabit = {
          userID: this.$fire.auth.currentUser.uid,
          weekDays: habit.weekDays,
          name: habit.name,
          accomplished: habit.accomplished,
        }
        this.$fire.firestore
          .collection('habits')
          .doc(habit.docID)
          .set(todayHabit)
      })
    },
  },
  created() {
    this.today.setHours(0, 0, 0, 0)
    this.currentMonth = this.today.getMonth() + 1
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
      this.cleanUpdate()
    },
    cleanUpdate() {
      this.habitName = ''
      this.checkedWeekDays = []
      this.updateHabitId = ''
      this.updated = false
    },
    updateHabitModal(habit) {
      this.habitName = habit.name
      this.checkedWeekDays = habit.weekDays
      this.updateHabitId = habit
      this.updated = true
    },
    updateHabit() {
      const updatedHabit = {
        userID: this.$fire.auth.currentUser.uid,
        name: this.habitName,
        weekDays: this.checkedWeekDays,
        accomplished: this.updateHabitId.accomplished,
      }
      this.$fire.firestore
        .collection('habits')
        .doc(this.updateHabitId.docID)
        .set(updatedHabit)
        .then(() => {
          this.habits.splice(this.habits.indexOf(this.updateHabitId), 1)
          this.habits.unshift({
            ...updatedHabit,
            docID: this.updateHabitId.docID,
          })
          this.cleanUpdate()
        })
    },
    deleteHabit(habit) {
      this.$fire.firestore
        .collection('habits')
        .doc(habit.docID)
        .delete()
        .then(() => {
          this.habits.splice(this.habits.indexOf(habit), 1)
          this.cleanUpdate()
        })
    },
    getIcon(habit, day) {
      let icon = ''
      const weekDay = new Date(this.currentYear, this.currentMonth - 1, day)
      if (habit.weekDays.includes(weekDay.getDay().toString())) {
        habit.accomplished.forEach((time) => {
          if (time === weekDay.getTime()) {
            icon = 'check'
          }
        })
        if (icon === '') {
          icon = 'times'
        }
      } else {
        icon = null
      }
      return icon
    },
    getDay(day) {
      let dayString = ''
      switch (day) {
        case '0':
          dayString = 'Sunday'
          break
        case '1':
          dayString = 'Monday'
          break
        case '2':
          dayString = 'Tuesday'
          break
        case '3':
          dayString = 'Wednesday'
          break
        case '4':
          dayString = 'Thursday'
          break
        case '5':
          dayString = 'Friday'
          break
        default:
          dayString = 'Saturday'
          break
      }
      return dayString
    },
    update() {
      this.habits = []
      this.$fire.firestore
        .collection('habits')
        .where('userID', '==', this.$fire.auth.currentUser.uid)
        .get()
        .then((results) => {
          results.forEach((doc) => {
            this.habits.push({
              docID: doc.id,
              ...doc.data(),
            })
          })
        })
        .then(() => {
          this.todaysHabits.forEach((habit) => {
            habit.accomplished.forEach((time) => {
              if (time === this.today.getTime()) {
                this.accomplishedToday.push(habit.docID)
              }
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

.habits {
  font-family: 'Karla', sans-serif;
  overflow-y: auto;
  width: 100%;
}
.check {
  color: #479f76;
}
.times {
  color: #e35d6a;
}
</style>
