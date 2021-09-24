<template>
  <main>
    <div id="nav">
      <router-link to="/">CHAT</router-link> |
      <router-link to="/rewards">REWARDS</router-link> |
      <router-link to="/users">USERS</router-link>
    </div>
    <router-view/>
  </main>
</template>

<script>
import { io } from 'socket.io-client';
import { useStore } from 'vuex';

export default {
  setup() {
    const socket = io('http://localhost:4455');
    const store = useStore();
    socket.on('chat', (data) => store.dispatch('addChat', data));
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
