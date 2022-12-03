import { createStore } from "vuex";

export default createStore({
  state: {
    userData: null,
  },
  getters: {},
  mutations: {},
  actions: {
    storeUserData: ({ state }, value) => {
      state.userData = value;
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },
    removeUserData: ({ state }) => {
      state.userData = null;
      localStorage.removeItem("userData");
    },
  },
  modules: {},
});
