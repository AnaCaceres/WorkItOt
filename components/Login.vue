<template>
  <div
    class="d-flex flex-wrap flex-lg-nowrap bg-light align-items-center justify-content-center px-0 h-100"
  >
    <div
      class="text-center text-secondary overflow-hidden border-bottom border-top"
    >
      <transition name="fade" mode="out-in">
        <div v-if="isSignUp" :key="isSignUp" class="my-3 py-3">
          <h2 class="display-5">Hello newcomer!</h2>
          <p class="lead">
            Enter your personal details to start your journey to a healthier
            lifestyle.
          </p>
        </div>
        <div v-else :key="isSignUp" class="my-3 py-3">
          <h2 class="display-5">Welcome Back!</h2>
          <p class="lead">
            Let's get back together to continue your progress towards a better
            lifestyle.
          </p>
        </div>
      </transition>
    </div>
    <div
      class="bg-dark px-0 w-100 d-flex justify-content-center align-items-center align-self-md-stretch"
    >
      <transition name="fade" mode="out-in">
        <form
          v-if="isSignUp"
          :key="isSignUp"
          class="bg-light p-3 w-75 flex-grow-1 flex-md-grow-0"
          @submit.prevent="createUser"
        >
          <div class="text-center">
            <h1>Create Account</h1>
            <div class="social-container">
              <a
                href="#"
                class="social bg-white text-info"
                @click="singInProvider('facebook')"
              >
                <span class="visually-hidden">Facebook Login</span>
                <font-awesome-icon :icon="['fab', 'facebook']" />
              </a>
              <a
                href="#"
                class="social bg-white text-info"
                @click="singInProvider('google')"
              >
                <span class="visually-hidden">Google Login</span>
                <font-awesome-icon :icon="['fab', 'google']" />
              </a>
            </div>
            <p class="pb-3 border-bottom">or use your email for registration</p>
          </div>
          <div class="pb-3 mb-3 border-bottom">
            <div class="mb-3">
              <label for="signUpEmail" class="form-label">Email address</label>
              <input
                id="signUpEmail"
                v-model="userEmail"
                type="email"
                class="form-control"
                placeholder="Email"
              />
            </div>
            <div class="mb-3">
              <label for="signUpPassword" class="form-label">Password</label>
              <input
                id="signUpPassword"
                v-model="userPassword"
                type="password"
                class="form-control"
                placeholder="Password"
              />
            </div>
            <button type="submit" class="btn btn-dark">Sign Up</button>
          </div>
          <div class="text-center">
            <p>Or</p>
            <button class="btn btn-info" @click="signUp = !signUp">
              Sign In
            </button>
          </div>
        </form>
        <form
          v-else
          :key="isSignUp"
          class="bg-light mx-auto p-5 col-md-6"
          @submit.prevent="singInUser"
        >
          <div class="text-center">
            <h1>Sign in</h1>
            <div class="social-container">
              <a
                href="#"
                class="social bg-white text-info"
                @click="singInProvider('facebook')"
              >
                <span class="visually-hidden">Facebook Login</span>
                <font-awesome-icon :icon="['fab', 'facebook']" />
              </a>
              <a
                href="#"
                class="social bg-white text-info"
                @click="singInProvider('google')"
              >
                <span class="visually-hidden">Google Login</span>
                <font-awesome-icon :icon="['fab', 'google']" />
              </a>
            </div>
            <p class="pb-3 border-bottom">or use your account</p>
          </div>
          <div class="pb-3 mb-3 border-bottom">
            <div class="mb-3">
              <label for="signUpEmail" class="form-label">Email address</label>
              <input
                id="signUpEmail"
                v-model="userEmail"
                type="email"
                class="form-control"
                placeholder="Email"
              />
            </div>
            <div class="mb-3">
              <label for="signUpPassword" class="form-label">Password</label>
              <input
                id="signUpPassword"
                v-model="userPassword"
                type="password"
                class="form-control"
                placeholder="Password"
              />
              <div id="passwordHelpBlock" class="form-text">
                Your password must be at least 6 characters long, contain
                letters and numbers, and must not contain spaces, special
                characters, or emoji.
              </div>
            </div>
            <button type="submit" class="btn btn-dark">Sign In</button>
          </div>
          <div class="text-center">
            <p>Or</p>
            <button class="btn btn-info" @click="signUp = !signUp">
              Sign Up
            </button>
          </div>
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    rightPanel: false,
    userEmail: '',
    userPassword: '',
    error: '',
    signUp: true,
  }),
  computed: {
    isSignUp() {
      return this.signUp
    },
  },
  methods: {
    createUser() {
      this.$fire.auth
        .createUserWithEmailAndPassword(this.userEmail, this.userPassword)
        .then(async (user) => {
          await this.$store.dispatch('logUser', user)
          this.$router.push('/trainings')
        })
        .catch((error) => {
          this.error = error
        })
    },
    singInUser() {
      this.$fire.auth
        .signInWithEmailAndPassword(this.userEmail, this.userPassword)
        .then(async (user) => {
          await this.$store.dispatch('logUser', user)
          this.$router.push('/trainings')
        })
        .catch((error) => {
          this.error = error
        })
    },
    singInProvider(prov) {
      const provider =
        prov === 'google'
          ? new this.$fireModule.auth.GoogleAuthProvider()
          : new this.$fireModule.auth.FacebookAuthProvider()

      this.$fire.auth
        .signInWithPopup(provider)
        .then(async (user) => {
          await this.$store.dispatch('logUser', user)
          if (prov === 'google' && user.additionalUserInfo.isNewUser) {
            this.$fire.firestore.collection('profile').add({
              userID: user.user.uid,
              name: user.additionalUserInfo.profile.name,
              picture: user.additionalUserInfo.profile.picture,
            })
          } else if (prov === 'facebook') {
            // console.log(user)
          }
          this.$router.push('/trainings')
        })
        .catch((error) => {
          this.error = error
        })
    },
  },
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Staatliches', cursive;
}

.social-container {
  margin: 20px 0;
  height: 10%;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
</style>
