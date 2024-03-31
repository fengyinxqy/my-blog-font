import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useUserStore = defineStore({
  id: 'myStore',
  state: () => ({
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    isLogin: !!Cookies.get('token')
    // your state properties
  }),
  actions: {
    // your actions
    setUserInfo (userInfo) {
      this.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      this.setLoginStatus(true)
    },
    setLoginStatus (isLogin) {
      this.isLogin = isLogin
    }
  }
})
