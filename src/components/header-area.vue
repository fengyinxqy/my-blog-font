<template>
  <div class="header jc-sb flex px-5">
    <h1 class="logo center flex">
      <img
        :src="userInfo.avatar"
        alt="logo"
        width="50"
        height="50"
      >
    </h1>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-header"
      mode="horizontal"
      router
    >
      <el-menu-item index="/home">
        首页
      </el-menu-item>
      <el-menu-item index="/article">
        文章
      </el-menu-item>
      <el-menu-item index="3">
        更新记录
      </el-menu-item>
    </el-menu>
    <div class="flex items-center mr-4">
      <el-button
        type="primary"
        circle
        size="large"
        @click="$router.push('/edit')"
      >
        <el-icon><EditPen /></el-icon>
      </el-button>
    </div>

    <div class="avatar center">
      <el-popover
        :width="50"
        trigger="hover"
      >
        <div class="column">
          <el-button
            class="avatar-button"
            text
            @click="editProfile"
          >
            修改信息
          </el-button>
          <el-divider />
          <el-button
            class="avatar-button"
            text
            @click="logout"
          >
            退出登录
          </el-button>
        </div>
        <template #reference>
          <el-avatar
            :size="50"
            :src="circleUrl"
          />
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script>
import avatarImg from '@/assets/img/avatar.jpg'
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
export default {
  name: 'HeaderArea',

  data () {
    return {
      activeIndex: this.$route.path,
      circleUrl: avatarImg
    }
  },
  computed: {
    ...mapState(useUserStore, ['userInfo'])
  },

  mounted () {

  },

  methods: {
    editProfile () {

    },
    logout () {
      this.$axios.post('/user/logout', { username: this.userInfo.username }).then(res => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  border-bottom: 1px solid #e6e6e6;
}

.logo{
  width: 60px
}

.el-menu-header{
  width: 100%;
  margin-left: 20px;
}

::v-deep .el-menu{
  border-bottom: none;
}

.el-divider{
  margin: 0;
}

.avatar-button{
  padding: 20px 0;
  font-size: 15px;
}
</style>
