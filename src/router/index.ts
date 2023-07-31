import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'IndexPage',
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/pages/layout/index.vue'),
    children: [
      {
        path: '/model',
        name: 'model',
        meta: {
          title: 'model'
        },
        component: () => import('@/pages/model/model-list.vue')
      },
      {
        path: '/model-detail',
        name: 'model-detail',
        meta: {
          title: 'model'
        },
        component: () => import('@/pages/model/model-detail.vue')
      },
      {
        path: '/playground',
        name: 'playground',
        meta: {
          title: 'playground'
        },
        component: () => import('@/pages/playground/index.vue')
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      title: 'model'
    },
    component: () => import('@/pages/model/model-detail.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
});
export default router;
