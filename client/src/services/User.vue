<script>
const axios = require('axios');

const API = 'http://localhost:4455/api/v1/chat';

export default {
  async userData(page) {
    const data = await axios.get(`${API}/users?page=${page}`);
    return data.data;
  },
  async usersLength() {
    const data = await axios.get(`${API}/users/count`);
    return data.data.count;
  },
};
</script>
