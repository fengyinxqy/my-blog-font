<template>
  <div>
    <el-card
      style="width: 220px;"
      class="profile-card"
    >
      <div class="flex justify-center">
        <el-avatar
          :size="120"
          :src="userInfo.avatar"
        />
      </div>
      <div class="flex justify-center username pt-8">
        {{ userInfo.username }}
      </div>
    </el-card>
  </div>
</template>

<script>
import avatarImg from '@/assets/img/avatar.jpg'
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
export default {
  name: 'PersonalCard',

  data () {
    return {
      circleUrl: avatarImg
    }
  },

  computed: {
    ...mapState(useUserStore, ['userInfo'])
  },

  mounted () {

  },

  methods: {

  }
}
</script>
<style lang="scss" scoped>

.profile-card{
  min-height: 300px;
  margin: 100px 0 0 50px;
}
</style>
