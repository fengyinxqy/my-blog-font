<template>
  <el-container class="w-full h-screen page-container">
    <RouterView />
  </el-container>
</template>

<script>

export default {
  name: 'BlogApp',

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
.page-container{
  display: flex;
  flex-direction: column;
}

.el-main{
  margin: 10px;
  padding: 0;
  background-color: #f0ecec;
}
</style>
