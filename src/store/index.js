import { createStore } from "vuex";

export default createStore({
  state: {
    token: "",
  },
  getters: {},
  mutations: {},
  actions: {
    storeToken: ({ state }, value) => {
      state.token = value;
      localStorage.setItem("userToken", JSON.stringify(state.token));
    },
  },
  modules: {},
});
