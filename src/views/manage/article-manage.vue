<template>
  <div>
    <div class="bg-white p-5">
      <div class="mb-3">
        文章列表
      </div>
      <el-table
        :data="articleData"
        border
        size="default"
        show-overflow-tooltip
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
        />
        <el-table-column
          prop="title"
          label="文章标题"
        >
          <template #default="{row}">
            <el-button
              type="primary"
              link
              @click="$router.push(`/article/${row.articleId}`)"
            >
              {{ row.title }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="text"
          label="文章摘要"
        />
        <el-table-column
          prop="authorName"
          align="center"
          label="作者"
        />
        <el-table-column
          prop="createdAt"
          align="center"
          label="创建时间"
        />
        <el-table-column
          label="是否显示文章"
          align="center"
        >
          <template #default="{row}">
            <el-switch
              v-model="row.isDisplay"
              size="small"
              @change="handleDisplayChange(row.articleId, row.isDisplay)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template #default="{row}">
            <el-button
              size="small"
              type="danger"
              :loading="articleDataLoading"
              @click="handleDeleteArticle(row.articleId)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-center mt-5">
        <el-pagination
          v-model:current-page="pageConfig.currentPage"
          v-model:page-size="pageConfig.pageSize"
          hide-on-single-page
          :page-sizes="[10, 20, 30, 50]"
          layout="sizes, prev, pager, next"
          :total="articleData.length"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash-es'
export default {
  name: 'ArticleManage',

  data () {
    return {
      articleData: [],
      articleDataLoading: false,
      pageConfig: {
        pageSize: 10,
        currentPage: 1
      }
    }
  },

  mounted () {
    this.getArticleTable()
  },

  methods: {
    getArticleTable () {
      this.$axios.get('/article', { params: { isAll: 1 } }).then(res => {
        this.articleData = res.data.map(item => {
          const { content, createdAt } = item
          const contentHtml = document.createElement('div')
          contentHtml.innerHTML = content
          const contentText = contentHtml.innerText.slice(0, 50)
          item.createdAt = this.$dayJs(createdAt).format('YYYY-MM-DD HH:mm:ss')
          item.isDisplay = item.isDisplay === 1
          return { text: contentText, ...item }
        })
      })
    },
    handleDeleteArticle (articleId) {
      this.$confirm('此操作将永久删除文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteArticle(articleId)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteArticle (articleId) {
      this.articleDataLoading = true
      this.$axios.delete(`/article/${articleId}`).then(() => {
        this.$message.success('删除成功')
        this.getArticleTable()
      }).catch(err => {
        this.$message.error(err.message)
      }).finally(() => {
        this.articleDataLoading = false
      })
    },
    handleDisplayChange: debounce(function (id, isDisplay) {
      this.$axios.put(`/article/display/${id}`, { isDisplay }).then(() => {
        this.$message.success('修改成功')
        this.getArticleTable()
      }).catch(err => {
        this.$message.error(err.message)
      })
    }, 200)
  }
}
</script>
