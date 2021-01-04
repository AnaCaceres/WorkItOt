<template>
  <div class="container" :class="{ 'right-panel-active': rightPanel }">
    <div class="form-container sign-up-container">
      <form action="#" @submit="createUser">
        <h1>Create Account</h1>
        <div class="social-container">
          <a href="#" class="social">
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </a>
          <a href="#" class="social" @click="singInGoogle">
            <font-awesome-icon :icon="['fab', 'google']" />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input v-model="userEmail" type="email" placeholder="Email" />
        <input v-model="userPassword" type="password" placeholder="Password" />
        <button>Sign Up</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form action="#" @submit="singInUser">
        <h1>Sign in</h1>
        <div class="social-container">
          <a href="#" class="social">
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </a>
          <a href="#" class="social" @click="singInGoogle">
            <font-awesome-icon :icon="['fab', 'google']" />
          </a>
        </div>
        <span>or use your account</span>
        <input v-model="userEmail" type="email" placeholder="Email" />
        <input v-model="userPassword" type="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>
            Let's get back together to continue your progress towards a better
            lifestyle.
          </p>
          <button class="ghost" @click="changePanel">Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello newcomer!</h1>
          <p>
            Enter your personal details to start your journey to a healthier
            lifestyle.
          </p>
          <button class="ghost" @click="changePanel">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightPanel: false,
      userEmail: '',
      userPassword: '',
    }
  },
  methods: {
    changePanel() {
      this.rightPanel = !this.rightPanel
    },
    async createUser() {
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          this.userEmail,
          this.userPassword
        )
      } catch (e) {
        alert(e)
      }
    },
    async singInUser() {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.userEmail,
          this.userPassword
        )
      } catch (e) {
        alert(e)
      }
    },
    async singInGoogle() {
      try {
        const provider = new this.$fireModule.auth.GoogleAuthProvider()
        await this.$fire.auth.signInWithPopup(provider).then(function (result) {
          // const token = result.credential.accessToken
          // const user = result.user
        })
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

h1 {
  font-family: 'Staatliches', cursive;
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-weight: bold;
  font-size: 12px;
}

a {
  color: #000000;
  font-weight: bold;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #000000;
  background-color: #000000;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  top: 0;
}

input {
  font-family: 'Karla', sans-serif;
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 80%;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #000000;
  background: -webkit-linear-gradient(to right, #000000, #2b292a);
  background: linear-gradient(to right, #000000, #2b292a);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
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