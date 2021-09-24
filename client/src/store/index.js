import { createStore } from 'vuex';

export default createStore({
  state: {
    chat: [],
    rewards: [],
    users: [],
  },
  mutations: {
    getChat: (state, chat) => {
      state.chat.push(chat);
    },
    getRewards: (state, reward) => {
      state.rewards = reward;
    },
    getUsers: (state, user) => {
      state.users = user;
    },
  },
  actions: {
    addChat: ({ commit }, chat) => {
      commit('getChat', chat);
    },
    addReward: ({ commit }, reward) => {
      commit('getRewards', reward);
    },
    addUser: ({ commit }, user) => {
      commit('getUsers', user);
    },
  },
  modules: {
  },
});
