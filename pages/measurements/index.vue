<template>
  <div class="measurements">
    <h2>Measurements</h2>
    <div class="form my-4">
      <h4>Weight</h4>
      <div class="input-group mb-3">
        <input
          v-model="weight"
          type="number"
          class="form-control"
          placeholder="Weight"
          aria-label="weight"
          aria-describedby="weight"
        />
        <span id="weight" class="input-group-text">kg</span>
      </div>
      <h4>Measures</h4>
      <h6>Arms</h6>
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="input-group mb-3">
            <input
              v-model="leftArm"
              type="number"
              class="form-control"
              placeholder="Left Arm"
              aria-label="leftArm"
              aria-describedby="leftArm"
            />
            <span id="leftArm" class="input-group-text">cm</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="input-group mb-3">
            <input
              v-model="rightArm"
              type="number"
              class="form-control"
              placeholder="Rigth Arm"
              aria-label="rightArm"
              aria-describedby="rightArm"
            />
            <span id="rightArm" class="input-group-text">cm</span>
          </div>
        </div>
      </div>
      <h6>Thighs</h6>
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="input-group mb-3">
            <input
              v-model="leftThigh"
              type="number"
              class="form-control"
              placeholder="Left Thigh"
              aria-label="leftThigh"
              aria-describedby="leftThigh"
            />
            <span id="leftThigh" class="input-group-text">cm</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="input-group mb-3">
            <input
              v-model="rightThigh"
              type="number"
              class="form-control"
              placeholder="Rigth Thigh"
              aria-label="rightThigh"
              aria-describedby="rightThigh"
            />
            <span id="rightThigh" class="input-group-text">cm</span>
          </div>
        </div>
      </div>
      <h6>Calves</h6>
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="input-group mb-3">
            <input
              v-model="leftCalf"
              type="number"
              class="form-control"
              placeholder="Left Calf"
              aria-label="leftCalf"
              aria-describedby="leftCalf"
            />
            <span id="leftCalf" class="input-group-text">cm</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="col input-group mb-3">
            <input
              v-model="rightCalf"
              type="number"
              class="form-control"
              placeholder="Rigth Calf"
              aria-label="rightCalf"
              aria-describedby="rightCalf"
            />
            <span id="rightCalf" class="input-group-text">cm</span>
          </div>
        </div>
      </div>
      <h6>Waist &amp; Hips</h6>
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="input-group mb-3">
            <input
              v-model="waist"
              type="number"
              class="form-control"
              placeholder="Waist"
              aria-label="waist"
              aria-describedby="waist"
            />
            <span id="waist" class="input-group-text">cm</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="input-group mb-3">
            <input
              v-model="hips"
              type="number"
              class="form-control"
              placeholder="Hips"
              aria-label="hips"
              aria-describedby="hips"
            />
            <span id="hips" class="input-group-text">cm</span>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="btn btn-info text-white"
        @click="addMeasurement"
      >
        Save
      </button>
    </div>
    <div class="history mt-4">
      <h4>History of Measurements</h4>
      <div class="table-responsive">
        <table
          class="table table-striped table-hover"
          data-show-header="true"
          data-pagination="true"
          data-id-field="name"
          data-page-list="[5, 10, 25, 50, 100, ALL]"
          data-page-size="5"
        >
          <thead>
            <tr class="table-dark">
              <th scope="col">#</th>
              <th scope="col">Weight</th>
              <th scope="col">Right Arm</th>
              <th scope="col">Left Arm</th>
              <th scope="col">Right Thigh</th>
              <th scope="col">Left Thigh</th>
              <th scope="col">Right Calf</th>
              <th scope="col">Left Calf</th>
              <th scope="col">Waist</th>
              <th scope="col">Hips</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(measurement, i) in measurements" :key="i">
              <th scope="row">
                {{ measurement.transformedDate.getDate() }}/{{
                  measurement.transformedDate.getMonth() + 1
                }}/{{ measurement.transformedDate.getFullYear() }}
              </th>
              <td>{{ measurement.weight }}kg</td>
              <td>{{ measurement.rightArm }}cm</td>
              <td>{{ measurement.leftArm }}cm</td>
              <td>{{ measurement.rightThigh }}cm</td>
              <td>{{ measurement.leftThigh }}cm</td>
              <td>{{ measurement.rightCalf }}cm</td>
              <td>{{ measurement.leftCalf }}cm</td>
              <td>{{ measurement.waist }}cm</td>
              <td>{{ measurement.hips }}cm</td>
              <td @click="deleteMeasurement(measurement)">
                <font-awesome-icon
                  :icon="['fas', 'trash-alt']"
                  class="trash me-2"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data: () => ({
    measurements: [],
    weight: null,
    rightArm: null,
    leftArm: null,
    rightThigh: null,
    leftThigh: null,
    rightCalf: null,
    leftCalf: null,
    waist: null,
    hips: null,
    today: new Date(),
  }),
  created() {
    this.update()
  },
  methods: {
    addMeasurement() {
      const newMeasurement = {
        userID: this.$fire.auth.currentUser.uid,
        date: this.today,
        weight: this.weight,
        rightArm: this.rightArm,
        leftArm: this.leftArm,
        rightThigh: this.rightThigh,
        leftThigh: this.leftThigh,
        rightCalf: this.rightCalf,
        leftCalf: this.leftCalf,
        waist: this.waist,
        hips: this.hips,
      }
      this.$fire.firestore.collection('measurements').add(newMeasurement)
      this.weight = null
      this.rightArm = null
      this.leftArm = null
      this.rightThigh = null
      this.leftThigh = null
      this.rightCalf = null
      this.leftCalf = null
      this.waist = null
      this.hips = null
      this.update()
    },
    deleteMeasurement(measurement) {
      const index = this.measurements.indexOf(measurement)
      this.measurements.splice(index, 1)
      this.$fire.firestore
        .collection('measurements')
        .where('userID', '==', measurement.userID)
        .where('date', '==', measurement.date)
        .where('weight', '==', measurement.weight)
        .where('rightArm', '==', measurement.rightArm)
        .where('leftArm', '==', measurement.leftArm)
        .where('rightThigh', '==', measurement.rightThigh)
        .where('leftThigh', '==', measurement.leftThigh)
        .where('rightCalf', '==', measurement.rightCalf)
        .where('leftCalf', '==', measurement.leftCalf)
        .where('waist', '==', measurement.waist)
        .where('hips', '==', measurement.hips)
        .get()
        .then((results) => {
          results.forEach((doc) => {
            this.$fire.firestore.collection('measurements').doc(doc.id).delete()
          })
        })
    },
    update() {
      this.measurements = []
      this.$fire.firestore
        .collection('measurements')
        .where('userID', '==', this.$fire.auth.currentUser.uid)
        .get()
        .then((results) => {
          results.forEach((doc) => {
            this.measurements.push({
              ...doc.data(),
              transformedDate: new Date(doc.data().date.seconds * 1000),
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

.measurements {
  font-family: 'Karla', sans-serif;
  overflow-y: auto;
  width: 100%;
  padding: 24px;
  h6 {
    text-decoration: underline;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
}
</style>
