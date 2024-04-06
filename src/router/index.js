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
        },
        {
          path: '/chat',
          name: 'ChatRoom',
          component: () => import('../views/chat/chat-room.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: '/admin/home',
      component: () => import('../views/manage/manage-view.vue'),
      children: [
        {
          path: '/admin/home',
          name: 'Admin',
          component: () => import('../views/manage/index.vue')
        },
        {
          path: '/admin/article',
          name: 'AdminArticle',
          component: () => import('../views/manage/article-manage.vue')
        },
        {
          path: '/admin/user',
          name: 'AdminUser',
          component: () => import('../views/manage/user-manage.vue')
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
