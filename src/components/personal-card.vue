<template>
  <div>
    <el-card
      style="width: 220px;"
      class="profile-card"
    >
      <div class="flex justify-center">
        <el-avatar
          :size="120"
          :src="circleUrl"
        />
      </div>
      <div class="flex justify-center username pt-8">
        且听风吟
      </div>
      <div class="flex justify-center">
        越努力越幸运
      </div>
    </el-card>
  </div>
</template>

<script>
import avatarImg from '@/assets/img/avatar.jpg'
export default {
  name: 'PersonalCard',

  data () {
    return {
      circleUrl: avatarImg
    }
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
