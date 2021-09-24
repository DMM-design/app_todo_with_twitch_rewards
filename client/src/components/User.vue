<template>
  <div>
      <CustomPagination
        @getPage = getPage
        :lengthArrElement="lengthUsers"
      />
      <div class="users">
        <div class="user-container" v-for="user in users" :key="user">
          <header>
            <img :src="user.avatar" alt="avatar" class="user-container-avatar">
            <span class="user-container-id">
              {{user.user_id}}
            </span>
          </header>
          <article>
            <header>
              <div class="user-container-box">USERNAME</div>
              <span>{{user.username}}</span>
            </header>
            <div v-if="user.follower_from !== null" class="user-container-follow">
              <div>
                <span class="user-container-title">FOLLOWER</span>
                <span class="user-container-content">{{user.follower}}</span>
              </div>
              <div>
                <span class="user-container-title">FOLLOWER_AT</span>
                <span class="user-container-content">{{user.follower_from}}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import User from '@/services/User.vue';
import CustomPagination from '@/components/customable/customPagination.vue';

export default {
  components: {
    CustomPagination,
  },
  async setup() {
    // variables
    const store = useStore();
    const users = computed(() => store.state.users);
    const currentPage = ref(1);
    const lengthUsers = await User.usersLength();
    // functions
    const setPage = (page) => {
      User.userData(page)
        .then((data) => store.dispatch('addUser', data))
        .catch((error) => console.log(error));
    };
    setPage(currentPage.value);

    const getPage = (page) => setPage(page);

    return {
      users,
      currentPage,
      lengthUsers,
      getPage,
    };
  },
};
</script>
<style scoped lang="scss">
  $bgmain: #4D65B4;
  $bgdiv: #484A77;
  $bigdiv2: #323353;
  $colortxt: #ffffff;
  $fonttxt: 'Ubuntu';
  $borderRadius: 20px;

  .users{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .user-container {
      display: flex;
      margin-bottom: 20px;
      margin-left: 20px;
      background: $bgmain;
      border-radius: $borderRadius;
      width: 627px;
      height: 312px;
      box-shadow: 0px 4px 4px #0000007e;
       header{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin-left: 20px;
        .user-container-avatar {
          height: 197px;
          width: 171px;
          border-radius: $borderRadius;
        }
        .user-container-id{
          background: $bgdiv;
          color: $colortxt;
          font-size: 24px;
          width: 150px;
          padding: 10px;
          border-radius: $borderRadius;
        }
      }
      article {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        header{
          width: 90%;
          .user-container-box{
            background: $bgdiv;
            padding: 15px;
            border-radius: 10px;
            color: $colortxt;
            font-size: 18px;
          }
          span{
            margin-top: 5px;
            font-size: 24px;
            color: $colortxt;
          }
        }
        .user-container-follow{
          display: flex;
          justify-content: space-around;
          div{
            display: flex;
            flex-direction: column;
            .user-container-title{
              background: $bgdiv;
              width: 140px;
              padding: 15px;
              border-radius: 10px;
              color: $colortxt;
            }
            .user-container-content{
              color: $colortxt;
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
</style>
