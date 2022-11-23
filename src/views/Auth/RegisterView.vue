<template>
  <div class="row align-items-center justify-content-center g-0 min-vh-100">
    <div class="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0">
      <!-- Card -->
      <div class="card smooth-shadow-md">
        <!-- Card body -->
        <div class="card-body p-6">
          <div class="mb-4">
            <a href="#">
              <img
                src="assets/images/brand/logo/logo-primary.svg"
                class="mb-2"
                alt=""
              />
            </a>
            <p class="mb-6">Please enter your user information.</p>
          </div>
          <!-- Form -->
          <form @submit.prevent="register">
            <!-- Username -->
            <div class="mb-3">
              <label for="username" class="form-label">User Name</label>
              <input
                type="text"
                id="username"
                class="form-control"
                v-model="registerData.name"
                placeholder="User Name"
              />
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                class="form-control"
                v-model="registerData.email"
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
                v-model="registerData.password"
                placeholder="........."
              />
            </div>
            <!-- Password confirm -->
            <div class="mb-3">
              <label for="confirm-password" class="form-label"
                >Confirm Password</label
              >
              <input
                type="password"
                id="confirm-password"
                class="form-control"
                v-model="registerData.passwordConfirmation"
                placeholder="........."
              />
            </div>
            <div>
              <!-- Button -->
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">
                  Create Account
                </button>
              </div>

              <div class="d-md-flex justify-content-between mt-4">
                <div class="mb-2 mb-md-0">
                  <router-link :to="{ name: 'login' }" class="fs-5"
                    >Already member? Login
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
  name: "RegisterView",
  data() {
    return {
      registerData: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      isRequired: "",
      isPasswordConfirmed: "",
    };
  },
  methods: {
    register() {
      if (
        !this.registerData.name ||
        !this.registerData.email ||
        !this.registerData.password
      ) {
        this.isRequired = "Please fill all info!";
      } else if (
        this.registerData.password !== this.registerData.passwordConfirmation
      ) {
        this.isPasswordConfirmed =
          "Password and password confirmation did't match!";
      } else {
        console.log(this.registerData);
      }
    },
  },
};
</script>
