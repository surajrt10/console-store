export const sessionStore = {
  state: {
    userData: null,
    isUser: false,
  },
  mutations: {
    setUser(state, payload) {
      state.userData = payload;
      state.isUser = true;
      
    },
},
  actions: {
    setUser(context, payload) {
      context.commit("setUser", payload);
    },
  },
  getters: {
    userData(state) {
      return state.userData;
    },
    isUser(state) {
      return state.isUser;
    },
  },
};