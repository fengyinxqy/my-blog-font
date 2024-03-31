<template>
  <div class="home flex column">
    <header-area />
    <el-main class="h-max bg-neutral-200">
      <RouterView />
    </el-main>
    <footer-area />
  </div>
</template>

<script>
import headerArea from '@/components/header-area.vue'
import footerArea from '@/components/footer-area.vue'
export default {
  name: 'HomeView',
  components: {
    headerArea,
    footerArea
  },
  data () {
    return {
    }
  },

  mounted () {

  },

  methods: {
    editProfile () {

    },
    logout () {

    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  height: 100%;
}
</style>
