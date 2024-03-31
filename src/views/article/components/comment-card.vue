<template>
  <el-card class="mt-12">
    <template #header>
      <div class="card-header">
        <div class="font-bold text-xl">
          评论({{ commentData.count }})
        </div>
        <div>
          <el-radio-group v-model="commentSort">
            <el-radio-button
              label="最新"
              value="new"
            />
            <el-radio-button
              label="最热"
              value="hot"
            />
          </el-radio-group>
        </div>
        <div class="mt-4">
          <el-input
            v-model="commentValue"
            type="textarea"
            :autosize="{minRows: 2}"
            placeholder="请输入评论"
          />
          <div class="mt-2 flex justify-end">
            <el-button
              type="primary"
              size="default"
              @click="commitComment"
            >
              评论
            </el-button>
          </div>
        </div>
      </div>
    </template>
    <div class="comment-content">
      <div
        v-for="item in commentData.comments"
        :key="item.commentId"
        class="comment-item flex "
      >
        <div class="flex">
          <div class="comment-avatar">
            <img
              :src="item.avatar"
              alt="!"
              class="avatar-img"
            >
          </div>
          <div class="comment-wrapper">
            <div>{{ item.authorName }}</div>
            <div class="comment-desc">
              {{ item.content }}
            </div>
            <div class="comment-time">
              <div class="flex">
                <div>{{ $dayJs(item.createdAt).format('YYYY-MM-DD HH:mm') }}</div>
                <div
                  class="can-click pd-20"
                  @click="openCommentInput(item.commentId)"
                >
                  {{ item.isOpen ? '收起' : '回复' }}
                </div>
              </div>
              <div class="comment-more can-click">
                ...
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="item.isOpen"
          class="commit-input sub-commit-input"
        >
          <el-input
            v-model="subCommentValue"
            type="textarea"
            :autosize="{minRows: 2}"
            placeholder="请输入评论"
          />
          <div class="commit-input-bottom mt-2">
            <el-button
              type="primary"
              @click="commitComment(item.commentId)"
            >
              提交
            </el-button>
          </div>
        </div>
        <div
          v-for="subComment in item.subComments"
          :key="subComment.commentId"
          class="comment-item flex "
        >
          <div class="flex">
            <div class="comment-avatar">
              <img
                :src="subComment.avatar"
                alt="!"
                class="avatar-img"
              >
            </div>
            <div class="comment-wrapper">
              <div>
                {{ subComment.authorName }}
                <span>回复 {{ replayAuthor(item,subComment) }}</span>
              </div>
              <div class="comment-desc">
                {{ subComment.content }}
              </div>
              <div class="comment-time">
                <div class="flex">
                  <div>{{ $dayJs(subComment.createdAt).format('YYYY-MM-DD HH:mm') }}</div>
                  <div
                    class="can-click ml-4"
                    @click="openCommentInput(item.commentId,subComment.commentId)"
                  >
                    {{ subComment.isOpen ? '收起' : '回复' }}
                  </div>
                </div>
                <div class="comment-more can-click">
                  ...
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="subComment.isOpen"
            class="commit-input sub-commit-input"
          >
            <el-input
              v-model="subCommentValue"
              type="textarea"
              :autosize="{minRows: 2}"
              placeholder="请输入评论"
            />
            <div class="commit-input-bottom mt-2">
              <el-button
                type="primary"
                @click="commitComment(item.commentId,subComment.commentId)"
              >
                提交
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
export default {
  name: 'MyBlogCommentCard',

  data () {
    return {
      commentSort: 'new',
      commentValue: '',
      subCommentValue: '',
      commentData: []
    }
  },

  computed: {
    ...mapState(useUserStore, ['userInfo']),
    articleId () {
      return this.$route.params.id
    }
  },
  watch: {
    commentValue (value) {
      if (value) {
        this.subCommentValue = ''
      }
    },
    subCommentValue (value) {
      if (value) {
        this.commentValue = ''
      }
    }
  },
  created () {
    this.getCommentList()
  },
  methods: {
    commitComment (commentId, replayCommentId) {
      if (!(this.commentValue || this.subCommentValue)) return
      const { id, username } = this.userInfo
      const params = {
        authorId: id,
        authorName: username,
        articleId: this.articleId,
        content: this.commentValue || this.subCommentValue
      }
      if (replayCommentId) {
        params.replayCommentId = replayCommentId
      }
      if (this.subCommentValue) {
        params.parentCommentId = commentId
      }
      this.$axios.post('/comment', params).then(res => {
        this.commentValue = ''
        this.subCommentValue = ''
        this.getCommentList()
      }).catch(err => {
        console.log(err)
      })
    },
    replayAuthor (parentComment, comment) {
      if (!comment.replayCommentId) return parentComment.authorName
      const replayComment = parentComment.subComments.find(item => item.commentId === comment.replayCommentId)
      return replayComment.authorName
    },
    openCommentInput (commentId, subCommentId = '') {
      const index = this.commentData.comments.findIndex(item => item.commentId === commentId)
      if (subCommentId) {
        const subComment = this.commentData.comments[index].subComments.find(item => item.commentId === subCommentId)
        subComment.isOpen = !subComment.isOpen
        return
      }
      this.commentData.comments[index].isOpen = !this.commentData.comments[index].isOpen
    },
    sortComment () {

    },
    getCommentList () {
      this.$axios.get(`/comment/${this.articleId}`).then((res) => {
        this.commentData = res.data
      }).catch((err) => {
        this.$message.error(err.message)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/** 评论区域 */
.comment-count{
  font-weight: 700;
  font-size: 18px;
}

.comment-commit{
  display:flex;
  padding: 20px 0;
}

.commit-input{
  width: 100%;
  padding-left: 20px;
}

.commit-input-bottom{
  display:flex;
  justify-content: flex-end;
}

.avatar-img{
  width:50px;
  height: 50px;
  border-radius: 50%;
}

.comment-item{
  flex-direction: column;
  padding: 20px 20px 0;
}

.sub-commit-input{
  padding-top: 20px;
  padding-left: 70px;
}

.comment-wrapper{
  width: 100%;
  padding-left: 20px;
  font-size: 16px;
}

.comment-time{
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: rgb(138, 145, 159);
  font-size: 14px;
}

.pd-20{
  padding: 0 20px;
}

.can-click{
  cursor: pointer;
}
</style>
