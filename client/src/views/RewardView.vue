<template>
  <main>
    <suspense> <Reward /> </suspense>
  </main>
</template>

<script>
import Reward from '@/components/Reward.vue';

export default {
  name: 'RewardView',
  components: {
    Reward,
  },
};
</script>
