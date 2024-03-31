import { createRouter, createWebHashHistory } from 'vue-router'
import Cookies from 'js-cookie'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/home',
      component: () => import('../views/home-view.vue'),
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('../views/index.vue')
        },
        {
          path: '/article',
          name: 'Article',
          component: () => import('../views/article/article-view.vue')
        },
        {
          path: '/article/:id',
          name: 'ArticleDetail',
          component: () => import('../views/article/article-detail.vue')
        },
        {
          path: '/edit',
          name: 'Edit',
          component: () => import('../views/article/article-edit.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login-view.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkIfUserIsAuthenticated()
  if (to.path === '/login' || to.path === '/register') {
    next()
  }
  if (isAuthenticated) {
    next()
  } else {
    next({ path: '/login' })
  }
})

function checkIfUserIsAuthenticated () {
  return !!Cookies.get('token')
}

export default router
