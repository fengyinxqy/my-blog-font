<template>
  <el-switch
    v-model="isRegister"
    class="mb-2 justify-end mr-8 mt-6"
    active-text="Register"
    inactive-text="Login"
    size="large"
  />
  <div class="h-full flex justify-center items-center flex-col">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center flex-col">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      >
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {{ !isRegister? 'Sign in to your account' : 'Create an account' }}
      </h2>
    </div>
    <div class="h-1/2 form-container">
      <el-form
        ref="form"
        label-position="top"
        label-width="auto"
        :model="form"
        :rules="rules"
        status-icon
      >
        <el-form-item prop="username">
          <template #label>
            <span class="text-sm font-medium leading-6 text-gray-900">Username</span>
          </template>
          <el-input
            v-model="form.username"
            class="form-input"
          />
        </el-form-item>
        <el-form-item prop="password">
          <template #label>
            <span class="text-sm font-medium leading-6 text-gray-900">Password</span>
          </template>
          <el-input
            v-model="form.password"
            type="password"
            class="form-input"
            :show-password="showPassword"
            @keyup.enter="submit"
          />
        </el-form-item>
        <el-button
          size="large"
          type="primary"
          class="login"
          @click="submit"
        >
          Sign in
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
export default {
  name: 'MyBlogLoginView',

  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      showPassword: false,
      isRegister: false
    }
  },

  computed: {
    operate () {
      return this.isRegister ? 'register' : 'login'
    }
  },

  methods: {
    ...mapActions(useUserStore, ['setUserInfo']),
    submit () {
      this.$refs.form.validate((valid) => {
        if (!valid) return
        this[this.operate]()
      })
    },
    login () {
      this.$axios.post('/user/login', this.form).then((res) => {
        const { userInfo } = res.data
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        this.setUserInfo(userInfo)
        this.$message.success('登陆成功')
        this.$router.push({ path: '/' })
      })
    },
    register () {
      this.$axios.post('/user/register', this.form).then((res) => {
        this.$message.success('注册成功,现在去登录吧~')
        this.isRegister = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
  width:100%;
}

.form-input{
  height: 35px;
  font-size:16px;
}

.form-container{
  min-width: 350px;
  padding-top: 30px;
}
</style>
