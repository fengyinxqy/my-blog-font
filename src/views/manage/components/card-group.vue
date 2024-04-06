<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-card>
        <template #default>
          <div class="flex justify-between items-center">
            <el-icon size="40">
              <User />
            </el-icon>
            <div>
              <div class="mb-2">
                网站总人数
              </div>
              <div>
                <span class="font-bold text-xl">
                  {{ overviewInfo.userCount }}
                </span>
              </div>
            </div>
          </div>
        </template>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        <template #default>
          <div class="flex justify-between items-center">
            <el-icon size="40">
              <Comment />
            </el-icon>
            <div>
              <div class="mb-2">
                网站总评论数
              </div>
              <div><span class="font-bold text-xl">{{ overviewInfo.commentCount }}</span></div>
            </div>
          </div>
        </template>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        <template #default>
          <div class="flex justify-between items-center">
            <el-icon size="40">
              <Document />
            </el-icon>
            <div>
              <div class="mb-2">
                网站总文章数
              </div>
              <div><span class="font-bold text-xl">{{ overviewInfo.articleCount }}</span></div>
            </div>
          </div>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'CardGroup',

  data () {
    return {
      overviewInfo: {}
    }
  },

  mounted () {
  },

  created () {
    this.getOverviewInfo()
  },

  methods: {
    getOverviewInfo () {
      this.$axios.get('/admin/overview').then(res => {
        this.overviewInfo = res.data
      }).catch(err => {
        this.$message.error(err.message)
      })
    }
  }
}
</script>
