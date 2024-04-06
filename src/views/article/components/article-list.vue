<template>
  <div class="pl-20 w-1/2 flex flex-col">
    <el-card
      v-for="article in articleList"
      :key="article.articleId"
      class="mb-6"
      shadow="hover"
      @click="$router.push(`/article/${article.articleId}`)"
    >
      <el-descriptions
        :title="article.title"
        :column="1"
        size="small"
      >
        <el-descriptions-item>
          <span>{{ article.authorName }}</span>
          <span class="ml-6">{{ formatCreateTime(article.createdAt) }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          {{ article.text }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-pagination
      :hide-on-single-page="count <= 10"
      class="mt-6 justify-center"
      background
      layout="prev, pager, next"
      :total="count"
    />
  </div>
</template>

<script>
export default {
  name: 'ArticleList',

  data () {
    return {
      showPagination: true,
      articleList: [],
      pageConfig: {
        page: 1
      },
      count: 0
    }
  },

  mounted () {
    this.getArticleList()
  },

  methods: {
    getArticleList () {
      this.$axios.get('/article').then((res) => {
        this.articleList = res.data.map((item) => {
          const { content } = item
          const contentHtml = document.createElement('div')
          contentHtml.innerHTML = content
          const contentText = contentHtml.innerText.slice(0, 100)
          return { text: contentText, ...item }
        })
        this.count = this.articleList.length
        this.pageConfig.page = 1
      }).catch((err) => {
        this.$message.error(err.message)
      })
    },
    formatCreateTime (time) {
      return this.$dayJs(time).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
<style lang="scss" scoped>
:deep .el-descriptions--small .el-descriptions__header{
  margin-bottom: 0;
}
</style>
