<template>
  <main>
    <suspense>
      <User />
    </suspense>
  </main>
</template>

<script>

import User from '@/components/User.vue';

export default {
  name: 'Home',
  components: {
    User,
  },
};
</script>
