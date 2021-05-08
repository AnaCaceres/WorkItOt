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
          <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
          <div class="flex-grow overflow-y-auto overflow-x-auto day-content">
            <p
              v-for="(attr, i) in attributes"
              :key="i"
              class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
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
      <div class="modal-dialog">
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
          <div class="modal-body">
            <p>{{ currentEvents }}</p>
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
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLabel" class="modal-title">
              {{ `Add ${type}` }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              data-bs-target="#infoModal"
              data-bs-toggle="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="eventName" class="form-label">Name</label>
              <input
                id="eventName"
                v-model="eventName"
                type="text"
                class="form-control"
                aria-describedby="eventName"
              />
            </div>
            <div class="mb-3">
              <label for="eventVideo" class="form-label">Video URL</label>
              <input
                id="eventVideo"
                v-model="eventVideo"
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
                placeholder="Specify excersice here"
                style="height: 100px"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
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
    addEvent() {
      const collection = this.type === 'training' ? 'trainings' : 'menus'
      this.$fire.firestore.collection(collection).add({
        userID: this.$fire.auth.currentUser.uid,
        date: this.date,
        name: this.eventName,
        description: this.eventDescription,
        video: this.eventVideo,
      })
      this.eventName = ''
      this.eventDescription = ''
      this.eventVideo = ''
      this.$emit('update')
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
</style>
