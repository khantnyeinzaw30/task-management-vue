import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/Auth/LoginView.vue";
import RegisterView from "../views/Auth/RegisterView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("userData")) next();
      else next({ name: "login" });
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("userData")) next();
      else next({ name: "register" });
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
