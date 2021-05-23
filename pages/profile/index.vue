<template>
  <div class="profile">
    <h2>Profile</h2>
    <div class="container p-4">
      <div class="row gx-5">
        <div class="col-12 col-md-6">
          <h4>Profile picture</h4>
          <div class="d-flex justify-content-between flex-wrap">
            <img
              v-if="userImage"
              :src="userImage"
              alt="mdo"
              width="150"
              height="150"
              class="rounded-circle mx-auto p-2"
            />
            <div
              class="mx-auto d-flex flex-column justify-content-around align-items-end p-2"
            >
              <input
                id="avatar"
                ref="avatar"
                class="form-control"
                type="file"
                name="avatar"
                accept="image/jpeg"
              />
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 p-2 d-flex align-items-stretch">
          <div
            class="p-3 border bg-light w-100 d-flex flex-column justify-content-around"
          >
            <label for="displayName">User Name: </label>
            <input
              id="displayName"
              v-model="name"
              type="text"
              class="form-control"
              placeholder="Your Name"
            />
            <label for="password">New password:</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="New password"
              class="form-control"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      type="button"
      class="btn btn-info text-white m-2 ms-md-auto"
      @click="updateUser"
    >
      Update user
    </button>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data: () => ({
    name: '',
    password: '',
  }),
  computed: {
    userImage() {
      return this.$store.state.userImg || this.$fire.auth.currentUser.photoURL
    },
    userName() {
      return this.$store.state.name || this.$fire.auth.currentUser.displayName
    },
  },
  created() {
    this.name = this.userName
  },
  methods: {
    updateUser() {
      const image = this.$refs.avatar.files[0]
      if (image) {
        const storage = this.$fire.storage
        storage
          .ref()
          .child(`images/${this.$fire.auth.currentUser.uid}.jpg`)
          .put(image)
          .then(async () => {
            const pathReference = storage.ref(
              `images/${this.$fire.auth.currentUser.uid}.jpg`
            )
            const url = await pathReference.getDownloadURL()
            this.$store.commit('changeUserImage', url)
            this.$fire.auth.currentUser.updateProfile({
              photoURL: url,
            })
          })
      }
      if (this.$fire.auth.currentUser.displayName !== this.name) {
        this.$store.commit('changeUserName', this.name)
        this.$fire.auth.currentUser.updateProfile({
          displayName: this.name,
        })
      }
      if (this.password !== '')
        this.$fire.auth.currentUser.updatePassword(this.password)
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@200&family=Nunito+Sans:wght@300&family=Staatliches&family=Teko:wght@300&display=swap');

.profile {
  font-family: 'Karla', sans-serif;
  overflow-y: auto;
  width: 100%;
  padding: 24px;
}
</style>
