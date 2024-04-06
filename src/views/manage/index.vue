<template>
  <div>
    <el-row>
      <el-col :span="24">
        <cardGroup />
      </el-col>
    </el-row>
    <el-divider />
    <el-row>
      <el-col :span="24">
        <last-week-chart />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import cardGroup from './components/card-group.vue'
import lastWeekChart from './components/lastweek-chart.vue'
export default {
  name: 'MyBlogIndex',
  components: {
    cardGroup,
    lastWeekChart
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
