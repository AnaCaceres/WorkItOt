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
          data-bs-target="#exampleModal"
        >
          <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
          <div class="flex-grow overflow-y-auto overflow-x-auto">
            <p
              v-for="attr in attributes"
              :key="attr.key"
              class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
              :class="attr.customData.class"
            >
              {{ attr.customData.title }}
            </p>
          </div>
        </div>
      </template>
    </v-calendar>
    <div
      id="exampleModal"
      class="modal modal-fullscreen-sm-down fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLabel" class="modal-title">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
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
    masks: {
      weekdays: 'W',
    },
    attributes: [],
  }),
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
</style>
