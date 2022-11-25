<template>
  <div class="row align-items-center justify-content-center g-0 min-vh-100">
    <div class="col-12 col-md-8 py-8">
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
          <div class="alert alert-danger" v-if="isRequired">
            <strong>{{ isRequired }}</strong>
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
            <div class="alert alert-danger" v-if="isPasswordNotConfirmed">
              <strong>{{ isPasswordNotConfirmed }}</strong>
            </div>
            <!-- random employee code -->
            <div class="mb-3">
              <label for="employee-code" class="form-label"
                >Generate Employee ID</label
              >
              <input
                type="text"
                id="employee-code"
                class="form-control"
                v-model="registerData.employeeCode"
                placeholder="eg . TMS-123456 or something like this"
              />
              <button
                type="button"
                class="btn btn-info mt-3"
                @click="generateEmployeeCode"
              >
                Click to generate
              </button>
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
        employeeCode: "",
      },
      isRequired: "",
      isPasswordNotConfirmed: "",
    };
  },
  methods: {
    register() {
      if (
        !this.registerData.name ||
        !this.registerData.email ||
        !this.registerData.password ||
        !this.registerData.employeeCode
      ) {
        this.isRequired = "Please fill all info!";
      } else if (
        this.registerData.password !== this.registerData.passwordConfirmation
      ) {
        this.isPasswordNotConfirmed =
          "Password and password confirmation did't match!";
      } else {
        this.isRequired = "";
        this.isPasswordNotConfirmed = "";
        this.axios
          .post("http://localhost:8000/api/register", this.registerData)
          .then((response) => {
            if (response.data.token) {
              this.$store.dispatch("storeUserData", response.data);
              this.$router.push({ name: "home" });
            }
          })
          .catch((error) => console.log(error));
      }
    },
    generateEmployeeCode() {
      this.registerData.employeeCode =
        "TMS-" + Math.floor(Math.random() * 100000);
    },
  },
};
</script>
