<template>
  <main class="chat">
    <div class="chat-bubble" v-for="chat in chats" :key="chat">
      <img :src="chat.user.avatar" alt="" class="chat-bubble-avatar">
      <article>
        <header class="chat-bubble-header">
          <span class="chat-bubble-header-nick">{{chat.user.display_name}}</span>
        </header>
        <p class="chat-bubble-message">{{chat.message}}</p>
      </article>
    </div>
  </main>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'Chat',
  setup() {
    const store = useStore();
    const chats = computed(() => store.state.chat);
    return {
      chats,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .chat{
    display: flex;
    flex-direction: column;
    align-items: center;
    .chat-bubble{
      display: flex;
      background-color: hsl(0, 0%, 11%);
      width: 40%;
      margin-bottom: 20px;
      overflow-wrap: break-word;
      word-wrap: break-word;
      hyphens: auto;
      text-align: left;
      .chat-bubble-avatar{
        height: 100px;
        width: 100px;
      }
      article{
        color:white;
        width: 83%;
        .chat-bubble-header{
          margin: 10px;
          padding: 0;
          text-align: left;
        }
        .chat-bubble-message{
          margin: 10px;
        }
      }
    }
  }
</style>
