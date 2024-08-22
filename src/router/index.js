import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/order',
      name: 'order',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/OrderView.vue')
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoView.vue')
    },
    {
      path: '/orderingService',
      name: 'orderingService',
      component: () => import('../views/OrderingService.vue')
    },
    {
      path: '/nest',
      name: 'nest',
      component: () => import('../views/NestView.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/NestDefaultChildView.vue')
        },
        {
          path: 'child1',
          name: 'child1',
          component: () => import('../views/NestChild1View.vue')
        },
        {
          path: 'child2',
          name: 'child2',
          component: () => import('../views/NestChild2View.vue')
        },
        {
          path: ':id',
          name: 'id',
          component: () => import('../views/DynRouteView.vue')
        },
      ]
    },
    {
      path: '/myTodos',
      name: 'myTodos',
      component: () => import('../views/MyTodosView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue')},
  ]
})

export default router
