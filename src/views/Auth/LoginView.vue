<template>
  <div class="row align-items-center justify-content-center g-0 min-vh-100">
    <div class="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0">
      <!-- Card -->
      <div class="card smooth-shadow-md">
        <!-- Card body -->
        <div class="card-body p-6">
          <div class="mb-4">
            <a href="#"
              ><img
                src="assets/images/brand/logo/logo-primary.svg"
                class="mb-2"
                alt=""
            /></a>
            <p class="mb-6">Please enter your user information.</p>
          </div>
          <div class="alert alert-danger" v-if="logginFailed">
            <strong>The credentials do not match!</strong>
          </div>
          <div class="alert alert-danger" v-if="authFailed">
            <strong>{{ authFailed }}</strong>
          </div>
          <!-- Form -->
          <form @submit.prevent="login">
            <!-- email -->
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                class="form-control"
                :class="{ 'is-invalid': logginFailed }"
                v-model="loginData.email"
                placeholder="Email address here"
              />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                id="password"
                class="form-control"
                :class="{ 'is-invalid': logginFailed }"
                v-model="loginData.password"
                placeholder="Password here"
              />
            </div>
            <div>
              <!-- Button -->
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">Sign in</button>
              </div>
              <div class="d-md-flex justify-content-between mt-4">
                <div class="mb-md-0">
                  <router-link :to="{ name: 'register' }" class="fs-5"
                    >Create An Account
                  </router-link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      loginData: {
        email: "",
        password: "",
      },
      logginFailed: false,
      authFailed: "",
    };
  },
  methods: {
    login() {
      this.axios
        .post("http://localhost:8000/api/login", this.loginData)
        .then((response) => {
          if (response.data.token) {
            console.log(response.data);
            this.$store.dispatch("storeUserData", response.data);
            this.$router.push({
              name: "home",
            });
          } else if (response.data.status == "Auth Failed!") {
            this.authFailed = response.data.message;
            this.clearInput();
          } else if (response.data.status == "Login Failed!") {
            this.logginFailed = true;
            this.clearInput();
          }
        })
        .catch((error) => console.log(error.message));
    },
    // clear input
    clearInput() {
      this.loginData.email = "";
      this.loginData.password = "";
    },
  },
};
</script>
