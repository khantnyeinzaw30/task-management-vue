import { createStore } from "vuex";

export default createStore({
  state: {
    userData: {},
  },
  getters: {
    getToken: () => {
      const user = JSON.parse(localStorage.getItem("userData"));
      return user.token;
    },
    getEmployeeCode: () => {
      const user = JSON.parse(localStorage.getItem("userData"));
      return user.employee_code;
    },
  },
  mutations: {},
  actions: {
    storeUserData: ({ state }, value) => {
      state.userData = value;
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },
    removeUserData: ({ state }) => {
      state.userData = {};
      localStorage.removeItem("userData");
    },
  },
  modules: {},
});
