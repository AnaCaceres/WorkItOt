<template>
  <div class="profile">
    <h2>Profile</h2>
    <input
      @input="updateImg"
      ref="avatar"
      type="file"
      id="avatar"
      name="avatar"
      accept="image/jpeg"
    />
    {{ $fire.auth.currentUser }}
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  methods: {
    updateImg() {
      const image = this.$refs.avatar.files[0]
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
          this.$fire.auth.currentUser.updateProfile({
            photoURL: url,
          })
        })
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
