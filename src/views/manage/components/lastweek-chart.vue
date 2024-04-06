<template>
  <div class="bg-white">
    <div class="chart" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
let charts = {}
export default {
  name: 'LastWeekChart',

  data () {
    return {
      chart: null,
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line', // 设置指示器类型为竖线
            lineStyle: {
              color: '#999', // 设置竖线颜色
              width: 1, // 设置竖线宽度
              type: 'dashed' // 设置竖线样式为虚线
            }
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      }
    }
  },

  created () {
    this.getOverviewChartData()
  },

  mounted () {
    const chartDom = this.$el.querySelector('.chart')
    charts = echarts.init(chartDom)

    window.addEventListener('resize', this.handleResize)
  },

  beforeUnmount () {
    window.removeEventListener('resize', this.handleResize)
    if (charts) {
      charts.dispose()
    }
  },

  methods: {
    getOverviewChartData () {
      this.$axios.get('/admin/overview-chart').then(res => {
        const { date, articleData, commentData, userData } = res.data
        this.option.xAxis.data = date
        const series = [
          {
            data: articleData,
            type: 'line',
            smooth: true
          }, {
            data: commentData,
            type: 'line',
            smooth: true
          }, {
            data: userData,
            type: 'line',
            smooth: true
          }
        ]
        this.option.series = series
        charts.setOption(this.option)
      })
    },
    handleResize () {
      // 调用 resize 方法更新图表大小
      charts.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
.chart{
  width: 100%;
  height: 500px;
}
</style>
