<script>
const axios = require('axios');

const API = 'http://localhost:4455/api/v1/chat';

export default {
  async rewardData(page) {
    const data = await axios.get(`${API}/rewards?page=${page}`);
    return data.data;
  },
  async rewardsLength() {
    const data = await axios.get(`${API}/rewards/count`);
    return data.data.count;
  },
  async updateReward(id, done) {
    await axios.put(`${API}/rewards/${id}`, done);
  },
  async deleteReward(id) {
    await axios.delete(`${API}/rewards/${id}`);
  },
};
</script>
