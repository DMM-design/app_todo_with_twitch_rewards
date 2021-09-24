const queries = require('../../../db/queries');
const query = new queries();
module.exports = {
  async getUsersData(req, res) 
  {
    const { page } = req.query;
    const users = await query.getUsers(page);
    return res.status(200).json(users);
  },
  async getUser(req, res) 
  {
    const { id } = req.query;
    const user = await query.getUser(id);
    return res.status(200).json(user);
  },
  async getRewardsData(req, res) 
  {
    const { page } = req.query;
    const rewards = await query.getRewards(page);
    return res.status(200).json(rewards);
  },
  async getRewardsLength(req, res) 
  {
      query.getAllRewardsCount().then(count => {
        res.status(200).json({count: count[0].rewardCount});
      }).catch(()=> res.satatus(400).json('Problem with the "count reward" in database'));
  },
  async getUsersLength(req, res)
  {
    query.getAllUsersCount()
    .then(count =>  {res.status(200).json({count: count[0].userCount});
    }).catch(()=> res.satatus(400).json('Problem with the "count reward" in database'));
  },
  async updateReward(req, res) 
  {
    const { id } = req.params;
    const { done } = req.body;
    query.updateReward(id, done)
      .then(() => {})
      .catch((err) => console.log(err));
    ;
  },
  async deleteRewardsData(req, res) 
  {
    const { id } = req.params;
    await query.DelReward(id);
    res.status(200).json({message: 'Successfully deleted the reward'});
  }
}
