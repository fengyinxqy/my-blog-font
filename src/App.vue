<template>
  <el-container class="w-full h-screen page-container">
    <RouterView />
  </el-container>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
export default {
  name: 'BlogApp',

  data () {
    return {

    }
  },
  computed: {
    ...mapState(useUserStore, ['userInfo'])
  },

  mounted () {
    this.getUserInfo()
  },
  methods: {
    ...mapActions(useUserStore, ['setUserRoleInfo']),
    getUserInfo () {
      this.$axios.get(`/user/${this.userInfo.id}`).then((res) => {
        this.setUserRoleInfo(res.data.role)
      })
    }
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
