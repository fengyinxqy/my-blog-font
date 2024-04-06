<template>
  <div class="header jc-sb flex px-5">
    <h1 class="logo center flex">
      <img
        src="../assets/img/LOGO.jpg"
        alt="logo"
        width="50"
        height="50"
      >
    </h1>
    <el-menu
      v-if="!admin"
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
      <el-menu-item index="/chat">
        聊天室
      </el-menu-item>
      <el-menu-item
        v-if="role!==0"
        index="/admin"
      >
        管理后台
      </el-menu-item>
    </el-menu>
    <div
      v-if="!admin"
      class="flex items-center mr-4"
    >
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
      <el-button
        v-if="admin"
        round
        size="default"
        class="mr-5"
        @click="$router.push('/')"
      >
        返回主页
      </el-button>
      <el-popover
        :width="50"
        trigger="hover"
      >
        <div class="column">
          <el-button
            class="avatar-button"
            text
            @click="dialogFormVisible=true"
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
            :size="40"
            :src="userInfo.avatar"
          />
        </template>
      </el-popover>
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      title="修改个人信息"
    >
      用户名：
      <el-input
        v-model="userInfo.username"
        size="default"
        :disabled="true"
      />
      头像：
      <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:7001/api/v1/user"
        method="post"
        :data="{username: userInfo.username}"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="imageUrl"
          :src="imageUrl"
          class="avatar"
          width="200"
        >
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        />
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="dialogFormVisible = false"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
export default {
  name: 'HeaderArea',
  props: {
    admin: {
      type: Boolean,
      default: false,
      imageUrl: ''
    }
  },
  data () {
    return {
      activeIndex: this.$route.path,
      dialogFormVisible: false
    }
  },
  computed: {
    ...mapState(useUserStore, ['userInfo', 'role'])
  },

  watch: {
    userInfo: {
      handler (value) {
        if (value) {
          this.imageUrl = value.avatar
        }
      },
      immediate: true
    }

  },
  methods: {
    ...mapActions(useUserStore, ['setUserInfo']),
    handleAvatarSuccess (res, file) {
      this.$axios.get(`/user/${this.userInfo.id}`).then((res) => {
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        this.setUserInfo(res.data)
      })
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
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

:deep .el-menu{
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
<style lang="scss">
  .avatar-uploader .el-upload {
    position: relative;
    overflow: hidden;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    width: 178px;
    height: 178px;
    color: #8c939d;
    font-size: 28px;
    line-height: 178px;
    text-align: center;
  }

</style>
