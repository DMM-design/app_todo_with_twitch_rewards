/* eslint-disable linebreak-style */
/* eslint-disable default-case */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
const db = require('./connection');
const tmiListener = require('../src/libraries/twitchTmiListener');

module.exports = class Query 
{
  async createUser(user, extra) 
  {
    const [checkUser] = await db('users').where('user_id', extra.userId);
    if (checkUser === undefined) {
      const{total, data} = await tmiListener.setUserFollow(extra);
      const [createdUser] = await db('users')
      .insert({
        user_id: extra.userId,
        room_id: extra.roomId,
        username: user,
        display_name: extra.displayName,
        avatar: await tmiListener.getUserAvatar(extra),
        follower: (total !== 0 ) ? true : null,
        follower_from: (total !== 0 &&  data !== undefined) ? await data[0].followed_at : null,
      }).returning('*');

      return createdUser;
    }
    return checkUser;
  }

  async createRewards(user, message, reward, extra) 
  {
    const rewards = async (nameReward, idUser) => {
      // eslint-disable-next-line no-unused-vars
      const [createdReward] = await db('rewards')
        .insert({
          reward_id: extra.customRewardId,
          name_reward: nameReward,
          content: message,
          user_id: idUser.id,
          done: false,
          created_at: new Date(),
        })
        .returning('*');
        return createdReward;
    };

    const [checkUser] = await db('users').select('id').where('user_id', extra.userId);
    if (checkUser) {
      if(extra.reward.id == process.env.IMAGE){
        return rewards(reward, checkUser);
      }else if(extra.reward.id == process.env.THREED){
        return rewards(reward, checkUser);
      }else if(extra.reward.id == process.env.EMOTE){
        return rewards(reward, checkUser);
      }
    }
  }

  async getUsers(page) 
  {
    const data = await db('users').limit(10).offset((page - 1) * 10);
    return data;
  }

  async getRewards(page)
  {
    const data = await db('rewards')
      .join('users', 'rewards.user_id', '=', 'users.id')
      .select(
        'users.user_id',
        'users.username',
        'users.display_name',
        'users.avatar',
        'rewards.id',
        'rewards.done',
        'rewards.name_reward',
        'rewards.content',
        'rewards.created_at'
      ).limit(10).offset((parseInt(page) - 1) * 10);

      return data;
  }

  async getAllRewardsCount()
  {
      const allRewardsCount = await db('rewards').count('name_reward as rewardCount');
      return allRewardsCount;
  }

  async getAllUsersCount()
  {
    const allUsersCount = await db('users').count('user_id as userCount');
    return allUsersCount;
  }

  async getRewardsCount() 
  {
    const dbCount = (rewardName) => db('rewards').count('name_reward as rewardCount').where('name_reward', `${rewardName}`).then((count) => count[0].rewardCount);
    const image = await dbCount('🎨 Draw me an image 🎨');
    const threeD = await dbCount('🤖🎈Create me a 3D model 🤖🎈');
    const emote = await dbCount('Draw me an emote, pls :3');
    return {
      countImage: async () => image,
      countThreeD: async () => threeD,
      countEmote: async () => emote,
    };
  }

  async updateReward(id, done){
    await db('rewards')
      .where({id})
      .update({done});
  }

  async DelReward(id)
  {
    await db('rewards').where({id}).del();
  }

}