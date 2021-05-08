<template>
  <div class="measurements">
    <h2>Measurements</h2>
    <div class="form my-2">
      <h4>Weight</h4>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Weight"
          aria-label="weight"
          aria-describedby="weight"
        />
        <span class="input-group-text" id="weight">kg</span>
      </div>
      <h4>Measures</h4>
      <h6>Arms</h6>
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Left Arm"
              aria-label="leftArm"
              aria-describedby="leftArm"
            />
            <span class="input-group-text" id="leftArm">cm</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Rigth Arm"
              aria-label="rightArm"
              aria-describedby="rightArm"
            />
            <span class="input-group-text" id="rightArm">cm</span>
          </div>
        </div>
      </div>
      <h6>Thighs</h6>
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Left Thigh"
              aria-label="leftThigh"
              aria-describedby="leftThigh"
            />
            <span class="input-group-text" id="leftThigh">cm</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Rigth Thigh"
              aria-label="rightThigh"
              aria-describedby="rightThigh"
            />
            <span class="input-group-text" id="rightThigh">cm</span>
          </div>
        </div>
      </div>
      <h6>Calves</h6>
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Left Calf"
              aria-label="leftCalf"
              aria-describedby="leftCalf"
            />
            <span class="input-group-text" id="leftCalf">cm</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="col input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Rigth Calf"
              aria-label="rightCalf"
              aria-describedby="rightCalf"
            />
            <span class="input-group-text" id="rightCalf">cm</span>
          </div>
        </div>
      </div>
      <h6>Waist & Hips</h6>
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Waist"
              aria-label="waist"
              aria-describedby="waist"
            />
            <span class="input-group-text" id="waist">cm</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Hips"
              aria-label="hips"
              aria-describedby="hips"
            />
            <span class="input-group-text" id="hips">cm</span>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="btn btn-info text-white"
        data-bs-target="#infoModal"
        data-bs-toggle="modal"
        data-bs-dismiss="modal"
      >
        Save
      </button>
    </div>
    <div class="history mt-2">
      <h4>History of Measurements</h4>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
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
}
</style>
