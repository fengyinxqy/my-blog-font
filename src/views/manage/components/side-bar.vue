<template>
  <div class="side-bar">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical"
      width="220px"
      router
    >
      <el-menu-item index="/admin/home">
        <el-icon><setting /></el-icon>
        <span>网站总览</span>
      </el-menu-item>
      <el-menu-item index="/admin/article">
        <el-icon><setting /></el-icon>
        <span>文章管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/user">
        <el-icon><setting /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'SideBar',

  data () {
    return {

    }
  },

  mounted () {
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.side-bar{
  width: 220px;
  height: 100%;
}

.el-menu-vertical{
  height: 100%;
}
</style>
