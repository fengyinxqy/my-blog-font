<template>
  <div class="home flex column">
    <header-area :admin="true" />
    <el-main class="h-max bg-neutral-200">
      <sideBar />
      <div class="dashboard-editor-container w-full">
        <RouterView />
      </div>
    </el-main>
  </div>
</template>

<script>
import sideBar from './components/side-bar.vue'
import headerArea from '@/components/header-area.vue'
export default {
  name: 'ManageView',
  components: {
    headerArea,
    sideBar
  },
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
.home{
  height: 100%;
}

.el-main{
  display: flex;
  padding: 0;
}

.dashboard-editor-container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
}
</style>
