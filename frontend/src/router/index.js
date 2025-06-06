import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: () => import('@/views/InvoicesView.vue')
    },
    {
      path: '/invoices/new',
      name: 'invoices-post',
      component: () => import('@/views/InvoicesPostView.vue')
    },
    {
      path: '/invoices/:invoicesId',
      name: 'invoices-push',
      component: () => import('@/views/InvoicesPushView.vue'),
      props: true,
    },
    {
      path: '/customers',
      name: 'customers',
      component: () => import('@/views/CustomersView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
    name:'error-404',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFoundView.vue')
    },
  ],
})

export default router
