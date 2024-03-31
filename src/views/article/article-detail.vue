<!-- eslint-disable vue/no-v-html -->
<template>
  <el-row>
    <el-col
      :sm="0"
      :xs="0"
      :md="4"
      :xl="4"
      class="mr-16"
    >
      <personal-card />
    </el-col>
    <el-col
      :sm="24"
      :xs="24"
      :md="14"
      :xl="14"
    >
      <el-card>
        <template #header>
          <div class="card-header">
            <div class="text-2xl font-bold">
              {{ articleInfo.title }}
            </div>
            <div>
              <span class="text-sm">{{ articleInfo.authorName }}</span>
              <span class="ml-6 text-sm">{{ formatTime(articleInfo.createdAt) }}</span>
            </div>
          </div>
        </template>
        <div
          class="min-h-[500px]"
          v-html="articleInfo.content"
        />
      </el-card>
      <comment-card />
    </el-col>
    <el-col
      :sm="0"
      :xs="0"
      :md="6"
      :xl="6"
    >
      <div class="grid-content ep-bg-purple-light" />
    </el-col>
  </el-row>
</template>

<script>
import PersonalCard from '@/components/personal-card.vue'
import CommentCard from './components/comment-card.vue'
import { formatTime } from '@/lib/helper'
export default {
  name: 'ArticleDetail',
  components: {
    PersonalCard,
    CommentCard
  },

  data () {
    return {
      articleInfo: {}
    }
  },

  created () {
    this.getArticleInfo(this.$route.params.id)
  },

  mounted () {

  },

  methods: {
    formatTime,
    getArticleInfo (id) {
      this.$axios.get(`/article/${id}`).then((res) => {
        this.articleInfo = res.data
      })
    }
  }
}
</script>
