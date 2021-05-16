<template>
  <div class="d-flex flex-column p-3 bg-light">
    <ul class="nav nav-pills flex-column flex-fill">
      <li @click="active = 'trainings'">
        <NuxtLink
          to="/trainings"
          class="nav-link"
          :class="isSelected('trainings') ? 'active' : 'link-dark'"
        >
          <div data-bs-toggle="collapse" data-bs-target="#navbarToggler">
            <font-awesome-icon :icon="['fas', 'dumbbell']" class="me-2" />
            Trainings
          </div>
        </NuxtLink>
      </li>
      <li @click="active = 'menus'">
        <NuxtLink
          to="/menus"
          class="nav-link"
          :class="isSelected('menus') ? 'active' : 'link-dark'"
        >
          <div data-bs-toggle="collapse" data-bs-target="#navbarToggler">
            <font-awesome-icon :icon="['fas', 'utensils']" class="me-2" />
            Menus
          </div>
        </NuxtLink>
      </li>
      <li @click="active = 'habits'">
        <NuxtLink
          to="/habits"
          class="nav-link"
          :class="isSelected('habits') ? 'active' : 'link-dark'"
        >
          <div data-bs-toggle="collapse" data-bs-target="#navbarToggler">
            <font-awesome-icon :icon="['fas', 'tasks']" class="me-2" />
            Habits
          </div>
        </NuxtLink>
      </li>
      <li @click="active = 'measurements'">
        <NuxtLink
          to="/measurements"
          class="nav-link"
          :class="isSelected('measurements') ? 'active' : 'link-dark'"
        >
          <div data-bs-toggle="collapse" data-bs-target="#navbarToggler">
            <font-awesome-icon :icon="['fas', 'weight']" class="me-2" />
            Measurements
          </div>
        </NuxtLink>
      </li>
      <li @click="active = 'groceries'">
        <NuxtLink
          to="/groceries"
          class="nav-link"
          :class="isSelected('groceries') ? 'active' : 'link-dark'"
        >
          <div data-bs-toggle="collapse" data-bs-target="#navbarToggler">
            <font-awesome-icon
              :icon="['fas', 'shopping-basket']"
              class="me-2"
            />
            Groceries
          </div>
        </NuxtLink>
      </li>
      <li class="mt-auto" @click="active = 'about'">
        <NuxtLink
          to="aboutus"
          class="nav-link"
          :class="isSelected('about') ? 'active' : 'link-dark'"
        >
          <div data-bs-toggle="collapse" data-bs-target="#navbarToggler">
            <font-awesome-icon :icon="['fas', 'building']" class="me-2" />
            About us
          </div>
        </NuxtLink>
      </li>
    </ul>
    <hr />
    <div class="dropdown">
      <a
        id="dropdownUser2"
        href="#"
        class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle nav-link"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <font-awesome-icon
          v-if="!this.$fire.auth.currentUser.photoURL"
          :icon="['fas', 'user-ninja']"
          class="me-2"
        />
        <img
          v-else
          :src="this.$fire.auth.currentUser.photoURL"
          alt="mdo"
          width="32"
          height="32"
          class="rounded-circle me-2"
        />
        <strong>{{
          this.$fire.auth.currentUser.displayName
            ? this.$fire.auth.currentUser.displayName
            : 'User'
        }}</strong>
      </a>
      <ul
        class="dropdown-menu text-small shadow"
        aria-labelledby="dropdownUser2"
      >
        <li @click="active = 'profile'">
          <NuxtLink to="profile" class="dropdown-item">
            <div data-bs-toggle="collapse" data-bs-target="#navbarToggler">
              Profile
            </div>
          </NuxtLink>
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" href="#" @click="logout">Sign out</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: 'trainings',
  }),
  created() {
    this.active = this.$route.path.substring(1)
  },
  methods: {
    logout() {
      this.$fire.auth.signOut().then(async (user) => {
        await this.$store.dispatch('logOut')
        this.$router.push('/login')
      })
    },
    isSelected(tab) {
      return tab === this.active
    },
  },
}
</script>

<style lang="scss" scoped>
.active {
  background-color: #17a2b8 !important;
}
</style>
