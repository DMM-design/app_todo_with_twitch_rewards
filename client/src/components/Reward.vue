<template>
  <div>
    <CustomPagination
      @getPage = getPage
      :lengthArrElement="lengthRewards"
    />
    <div class="rewards">
      <div class="reward-container" v-for="reward in rewards" :key="reward">
        <div class="reward-container-icons">
          <img
            class="reward-container-icon"
            src="@/store/img/pen-tool.svg"
            v-if="reward.name_reward === '🤖🎈Create me a 3D model 🤖🎈'"
          />
          <img
            class="reward-container-icon"
            src="@/store/img/edit.svg"
            v-if="reward.name_reward === '🎨 Draw me an image 🎨'"
          />
          <img
            class="reward-container-icon"
            src="@/store/img/twitch.svg"
            v-if="reward.name_reward === 'Draw me an emote, pls :3'"
          />
        </div>
        <article>
          <header>{{reward.name_reward}}</header>
          <div class="reward-container-content">{{reward.content}}</div>
          <footer>
            <div class="reward-container-user">
              <img :src="reward.avatar" alt="avatar" class="reward-container-userAvatar">
              <p><span>{{reward.username}} <br /> {{reward.created_at}}</span></p>
            </div>
            <div class="reward-container-options">
              <button
                class="btn-check"
                title="DONE"
                v-if="reward.done !== true"
                @click="isDone(reward.id)"
              >
                <svg>
                  <image href="@/store/img/check.svg"/>
                </svg>
              </button>
              <button
                class="btn-undo"
                title="DONE"
                v-else
                @click="unDone(reward.id)"
              >
                UNDONE
              </button>
              <button
                class="btn-trash"
                title="DELETE"
                @click="
                    display = true,
                    rewardId = reward.id
                ">
                <svg>
                  <image href="@/store/img/trash-2.svg"/>
                </svg>
              </button>
            </div>
          </footer>
        </article>
      </div>
    </div>
    <CustomDeleteConfirm v-if="display"
      content="Are you sure you want to delete this reward?"
      @isConfirmed = ifDelete
      class="confirm-alert"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Rewards from '@/services/Rewards.vue';
import CustomDeleteConfirm from '@/components/customable/customConfirm.vue';
import CustomPagination from '@/components/customable/customPagination.vue';

export default {
  name: 'Reward',
  components: {
    CustomDeleteConfirm,
    CustomPagination,
  },
  async setup() {
    // variables
    const router = useRouter();
    const store = useStore();
    const rewards = computed(() => store.state.rewards);
    const lengthRewards = await Rewards.rewardsLength();
    const display = ref(false);
    const currentPage = ref(1);
    const rewardId = ref(0);
    const pages = ref([]);
    const done = ref(false);
    // Functions
    function setPage(page) {
      Rewards.rewardData(page)
        .then((data) => store.dispatch('addReward', data))
        .catch((error) => console.log(error));
    }
    setPage(currentPage.value);

    const ifDelete = (bool) => {
      if (bool) {
        Rewards.deleteReward(rewardId.value);
        router.go();
      }
      display.value = false;
    };
    const getPage = (page) => setPage(page);

    const isDone = (id) => {
      Rewards.updateReward(id, { done: true });
      router.go();
    };
    const unDone = (id) => {
      Rewards.updateReward(id, { done: false });
      router.go();
    };

    return {
      pages,
      rewards,
      display,
      rewardId,
      lengthRewards,
      done,
      setPage,
      ifDelete,
      getPage,
      isDone,
      unDone,
    };
  },
};
</script>

<style lang="scss">
  $bgmain: #165A4C;
  $bgadd: #313638;
  $bgcontent: #31363875;
  $bgbtncheck: #0EAF9B;
  $bgbtndel: #B33831;
  $btnundo: #115db4;
  $colortxt: #FFFFFF;

  .pagination{
    margin-bottom: 40px;
  }
  .rewards{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: 100%;
    .reward-container {
      display: flex;
      color: white;
      height: 350px;
      margin-left: 20px;
      width: 50%;
      border-radius: 0 20px 20px 20px;
      margin-bottom: 50px;
      filter: drop-shadow(0px 10px 4px rgba(0, 0, 0, 0.5));
      background-color: $bgmain;
      .reward-container-icons{
        position: absolute;
        bottom: 230px;
        right: 620px;
        width: 140px;
        height: 140px;
        .reward-container-icon{
          height: 140px;
          margin-left: 20px;
          background: white;
          border: 10px solid $bgmain;
          box-shadow: 4px 4px 4px #0000009a;
          transform: rotate(-16deg);
        }
      }
      article{
          overflow: hidden;
          width: 100%;
        header{
            position: relative;
            left: 350px;
            top: 10px;
            color: black;
            background-color: white;
            filter: drop-shadow(0px 5px 0px rgba(0, 0, 0, 0.5));
            width: 300px;
            padding: 20px;
            border-radius: 20px;
        }
        .reward-container-content{
          height: auto;
          display: grid;
          font-size: 20px;
          background: $bgcontent;
          height: 60%;
          place-items: center;
          z-index: 1;
        }
        footer{
          display: flex;
          position: relative;
          bottom: 10px;
          height: 90px;
          border-radius: 0 0 20px 20px;
          background: $bgadd;
          justify-content: space-between;
          .reward-container-options{
            display: flex;
            width: 40%;
            height: 100%;
            align-items: center;
            justify-content: space-around;
            button{
              height: 50px;
              width: 30%;
              border-radius: 20px;
              z-index: 1;
              box-shadow: 0px 3px 0px black;
              border: none;
              color: $colortxt;
              &:hover{cursor:pointer;}
              &:active{box-shadow:none;}
              svg{
                height: 30px;
                width: 30px;
                image{
                  height: 30px;
                }
              }
            }
            .btn-check{
              background-color: $bgbtncheck;
            }
            .btn-trash{
              background-color: $bgbtndel;
            }
            .btn-undo{
              background-color: $btnundo;
            }
          }
        }
        .reward-container-user{
          display: flex;
          align-items:center;
          span{
            margin-left: 20px;
          }
          .reward-container-userAvatar {
            height: 50px;
            margin-left: 20px;
            border-radius: 50%;
          }
          p{
            width: 100%;
            text-align: left;
            margin-left: 20px;
          }

        }
      }
    }
  }
</style>
