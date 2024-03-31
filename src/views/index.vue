<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="6">
          <el-statistic
            title="网站现有人数"
            :value="websiteInfo.userCount"
          />
        </el-col>
        <el-col :span="6">
          <el-statistic
            title="过去1天内新增人数"
            :value="websiteInfo.lastDayUserCount"
          />
        </el-col>
        <el-col :span="6">
          <el-statistic
            title="过去1天内新增文章数"
            :value="websiteInfo.lastDayArticleCount"
          />
        </el-col>
        <el-col :span="6">
          <el-statistic
            title="过去1天内新增评论数"
            :value="websiteInfo.articleCount"
          />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MyBlogIndex',

  data () {
    return {
      websiteInfo: {}
    }
  },

  created () {
    this.getWebsiteInfo()
  },

  mounted () {

  },

  methods: {
    getWebsiteInfo () {
      this.$axios.get('/website-info').then((res) => {
        this.websiteInfo = res.data
      }).catch((err) => {
        this.$message.error(err.message)
      })
    }
  }
}
</script>
