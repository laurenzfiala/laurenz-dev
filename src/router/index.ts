import { createRouter, createWebHistory } from 'vue-router';
import NavView from '../views/NavView.vue';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: NavView,
      children: [
        {
          path: '',
          component: () => HomeView,
        },
        {
          path: 'dnd',
          component: () => import('../views/DndView.vue'),
          children: [
            {
              path: 'dice',
              component: () => import('../views/dnd/DiceView.vue'),
              meta: { showNav: false },
            },
            {
              path: 'stats',
              component: () => import('../views/dnd/StatsView.vue'),
              meta: { showNav: false },
            },
          ],
        },
        {
          path: 'darts',
          component: () => import('../views/DartsView.vue'),
        },
        {
          path: 'imprint',
          component: () => import('../views/ImprintView.vue'),
        },
      ],
    },
  ],
});

export default router;
