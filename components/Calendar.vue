<template>
  <div class="h-100 w-100">
    <v-calendar
      class="custom-calendar w-100"
      :masks="masks"
      :attributes="attributes"
    >
      <template v-slot:day-content="{ day, attributes }">
        <div
          class="day-container flex flex-col h-full z-10 overflow-hidden"
          data-bs-toggle="modal"
          data-bs-target="#infoModal"
          @click="setEventDate(day.date)"
        >
          <span
            class="day-label text-sm text-gray-900"
            :class="{
              'text-info fw-bold text-decoration-underline':
                day.day === today.getDate() &&
                day.year === today.getFullYear() &&
                day.month === today.getMonth() + 1,
            }"
            >{{ day.day }}</span
          >
          <div class="flex-grow overflow-y-auto overflow-x-auto day-content">
            <p
              v-for="(attr, i) in attributes"
              :key="i"
              class="day-data bg-secondary text-white text-center fs-6 rounded p-1 mt-0 mb-1"
              :class="attr.customData.time"
            >
              {{ attr.customData.title }}
            </p>
          </div>
        </div>
      </template>
    </v-calendar>
    <div
      id="infoModal"
      class="modal modal-fullscreen-sm-down fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLabel" class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div v-if="currentEvents.length" class="modal-body">
            <div
              v-for="(event, i) in currentEvents"
              :key="i"
              class="bg-light rounded mb-2 p-4"
              :class="event.customData.time"
            >
              <div class="d-flex justify-content-between align-items-center">
                <h4>
                  {{ event.customData.title }}
                </h4>
                <span>
                  <font-awesome-icon
                    :icon="['fas', 'pencil-alt']"
                    class="edit me-2"
                    data-bs-target="#formModal"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                    data-bs-update="update"
                    @click="updateEventModal(event)"
                  />
                  <font-awesome-icon
                    :icon="['fas', 'trash-alt']"
                    class="trash me-2"
                    @click="deleteEvent(event)"
                  />
                </span>
              </div>
              <div v-if="type === 'menu'" class="mt-4">
                <h6>Meal time: {{ event.customData.time }}</h6>
              </div>
              <p v-if="event.customData.description" class="mt-4 mb-0">
                {{ event.customData.description }}
              </p>
              <div
                v-if="event.customData.video"
                class="d-flex justify-content-center mt-4"
              >
                <iframe
                  :src="event.customData.video.replace('watch?v=', 'embed/')"
                  height="200"
                  width="300"
                  :title="`${type} video`"
                ></iframe>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-info text-white"
              data-bs-target="#formModal"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              {{ `Add ${type}` }}
            </button>
          </div>
        </div>
      </div>
    </div>
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
            <h5 v-if="update" id="updateModalLabel" class="modal-title">
              {{ `Update ${type}` }}
            </h5>
            <h5 v-else id="addModalLabel" class="modal-title">
              {{ `Add ${type}` }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              data-bs-target="#infoModal"
              data-bs-toggle="modal"
              aria-label="Close"
              @click="cleanEvent"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="eventName" class="form-label">Name</label>
              <input
                id="eventName"
                v-model="eventName"
                :placeholder="`Specify ${type} here`"
                type="text"
                class="form-control"
                aria-describedby="eventName"
              />
            </div>
            <div v-if="type === 'menu'" class="mb-3">
              <h6>Meal time</h6>
              <div class="form-check form-check-inline">
                <input
                  id="breakfast"
                  v-model="selectedTime"
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  value="breakfast"
                />
                <label
                  class="form-check-label d-flex align-items-center"
                  for="breakfast"
                >
                  <svg
                    class="bd-placeholder-img rounded me-2"
                    width="15"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <rect width="100%" height="100%" fill="#feb272"></rect>
                  </svg>
                  Breakfast
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  id="lunch"
                  v-model="selectedTime"
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  value="lunch"
                />
                <label
                  class="form-check-label d-flex align-items-center"
                  for="lunch"
                >
                  <svg
                    class="bd-placeholder-img rounded me-2"
                    width="15"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <rect width="100%" height="100%" fill="#75b798"></rect>
                  </svg>
                  Lunch
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  id="snack"
                  v-model="selectedTime"
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  value="snack"
                />
                <label
                  class="form-check-label d-flex align-items-center"
                  for="snack"
                >
                  <svg
                    class="bd-placeholder-img rounded me-2"
                    width="15"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <rect width="100%" height="100%" fill="#e685b5"></rect>
                  </svg>
                  Snack
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  id="diner"
                  v-model="selectedTime"
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  value="diner"
                />
                <label
                  class="form-check-label d-flex align-items-center"
                  for="diner"
                >
                  <svg
                    class="bd-placeholder-img rounded me-2"
                    width="15"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <rect width="100%" height="100%" fill="#6ea8fe"></rect>
                  </svg>
                  Diner
                </label>
              </div>
            </div>
            <div class="mb-3">
              <label for="eventVideo" class="form-label">Video URL</label>
              <input
                id="eventVideo"
                v-model="eventVideo"
                placeholder="Specify video here"
                type="text"
                class="form-control"
                aria-describedby="eventVideo"
              />
            </div>
            <div class="mb-3">
              <label for="eventDescription" class="form-label">
                Description
              </label>
              <textarea
                id="eventDescription"
                v-model="eventDescription"
                class="form-control"
                placeholder="Specify description here"
                style="height: 100px"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              v-if="update"
              type="button"
              class="btn btn-info text-white"
              data-bs-target="#infoModal"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              @click="updateEvent"
            >
              Save
            </button>
            <button
              v-else
              type="button"
              class="btn btn-info text-white"
              data-bs-target="#infoModal"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              @click="addEvent"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  props: {
    attributes: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'training',
    },
  },
  data: () => ({
    masks: {
      weekdays: 'W',
    },
    date: new Date(),
    eventName: '',
    eventDescription: '',
    eventVideo: '',
    eventDate: '',
    selectedTime: '',
    oldEvent: '',
    today: new Date(),
    update: false,
  }),
  computed: {
    title() {
      return this.type === 'training' ? 'Training overview' : 'Menu overview'
    },
    currentEvents() {
      const currentEvents = []
      this.attributes.forEach((attr) => {
        if (attr.dates.getTime() === this.date.getTime()) {
          currentEvents.push(attr)
        }
      })
      return currentEvents
    },
  },
  methods: {
    setEventDate(date) {
      this.date = date
    },
    cleanEvent() {
      this.eventName = ''
      this.eventDescription = ''
      this.eventVideo = ''
      this.selectedTime = ''
      this.oldEvent = ''
    },
    addEvent() {
      let newEvent = {
        userID: this.$fire.auth.currentUser.uid,
        date: this.date,
        name: this.eventName,
        description: this.eventDescription,
        video: this.eventVideo,
      }
      let collection = 'trainings'
      if (this.type !== 'training') {
        collection = 'menus'
        newEvent = {
          ...newEvent,
          time: this.selectedTime,
        }
      }
      this.$fire.firestore.collection(collection).add(newEvent)
      this.cleanEvent()
      this.$emit('update')
    },
    updateEventModal(event) {
      this.eventName = event.customData.title
      this.eventDescription = event.customData.description
      this.eventVideo = event.customData.video
      this.selectedTime = event.customData.time
      this.oldEvent = event
      this.update = true
    },
    updateEvent() {
      let collection = null
      let updatedEvent = {
        userID: this.$fire.auth.currentUser.uid,
        date: this.oldEvent.customData.date,
        name: this.eventName,
        description: this.eventDescription,
        video: this.eventVideo,
      }
      if (this.type === 'training') {
        collection = 'trainings'
      } else {
        collection = 'menus'
        updatedEvent = {
          ...updatedEvent,
          time: this.selectedTime,
        }
      }
      this.$fire.firestore
        .collection(collection)
        .doc(this.oldEvent.docId)
        .set(updatedEvent)
        .then(() => {
          this.cleanEvent()
          this.$emit('update')
        })
    },
    deleteEvent(event) {
      console.log(event)
      const collection = this.type === 'training' ? 'trainings' : 'menus'
      this.$fire.firestore
        .collection(collection)
        .doc(event.docId)
        .delete()
        .then(() => {
          this.cleanEvent()
          this.$emit('update')
        })
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@200&family=Nunito+Sans:wght@300&family=Staatliches&family=Teko:wght@300&display=swap');

.day-container {
  position: relative;
  height: 100%;
  cursor: pointer;
  .add-item {
    position: absolute;
    z-index: 3;
    bottom: 0;
    right: 0;
  }
}
.day-content {
  height: calc(50vh / 6);
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.custom-calendar.vc-container {
  height: 100%;
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 100%;
  --day-height: 100%;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  & .vc-pane-container {
    height: 100%;
    .vc-pane-layout {
      height: 100%;
      .vc-pane {
        height: 100%;
      }
    }
  }
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
    height: 10%;
  }
  & .vc-weeks {
    padding: 0;
    height: 90%;
    grid-template-rows: min-content;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
.btn-info {
  background-color: #17a2b8 !important;
}
.text-info {
  color: #17a2b8 !important;
}
.trash,
.edit {
  cursor: pointer;
}
.day-data {
  overflow: hidden;
  text-overflow: ellipsis;
}
.breakfast {
  color: black !important;
  background-color: #fecba1 !important;
}
.lunch {
  color: black !important;
  background-color: #a3cfbb !important;
}
.snack {
  color: black !important;
  background-color: #efadce !important;
}
.diner {
  color: black !important;
  background-color: #9ec5fe !important;
}
</style>
