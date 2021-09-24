import { createRouter, createWebHistory } from 'vue-router';
import ChatView from '../views/ChatView.vue';
import UserView from '../views/UserView.vue';
import RewardView from '../views/RewardView.vue';

const routes = [
  {
    path: '/',
    name: 'Chat',
    component: ChatView,
  },
  {
    path: '/rewards',
    name: 'Rewards',
    component: RewardView,
  },
  {
    path: '/users',
    name: 'User',
    component: UserView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
