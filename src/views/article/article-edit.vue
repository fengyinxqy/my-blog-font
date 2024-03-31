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
      <div class="mb-2">
        <el-input
          v-model="title"
          placeholder="请输入标题"
          size="large"
        >
          <template #prepend>
            标题：
          </template>
        </el-input>
      </div>
      <div style="border: 1px solid #ccc;">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editor"
          :default-config="toolbarConfig"
          :mode="mode"
        />
        <Editor
          v-model="html"
          style="height: 500px; overflow-y: hidden;"
          :default-config="editorConfig"
          :mode="mode"
          @on-created="onCreated"
        />
      </div>
      <div class="mt-4 flex justify-end">
        <el-button
          size="large"
          @click="saveDraft"
        >
          保 存
        </el-button>
        <el-button
          size="large"
          type="primary"
          @click="submitArticle"
        >
          发 布
        </el-button>
      </div>
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
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import PersonalCard from '@/components/personal-card.vue'
import '@wangeditor/editor/dist/css/style.css'
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
export default {
  name: 'ArticleEdit',
  components: {
    PersonalCard, Editor, Toolbar
  },
  data () {
    return {
      editor: null,
      html: '',
      toolbarConfig: {
        excludeKeys: ['group-image', 'fullScreen', 'group-video']
      },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default',
      title: ''
    }
  },

  computed: {
    ...mapState(useUserStore, ['userInfo'])
  },

  created () {
    const articleDraft = localStorage.getItem('article')
    if (articleDraft) {
      this.$confirm('检测到本地存有草稿，是否加载草稿？', 'Warning', {
        confirmButtonText: '加载',
        cancelButtonText: '清除草稿',
        type: 'info',
        'close-on-click-modal': false,
        'close-on-press-escape': false,
        'close-on-hash-change': false
      }).then(() => {
        try {
          const { title, html } = JSON.parse(articleDraft)
          this.title = title
          this.html = html
        } catch {
          this.title = ''
          this.html = ''
        }
      }).catch(() => {
        localStorage.removeItem('article')
        this.title = ''
        this.html = ''
      })
    }
    window.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault() // 阻止默认保存行为
        // 在这里执行保存操作，例如发送保存请求等
        this.saveDraft()
      }
    })
  },

  beforeUnmount () {
    window.removeEventListener('keydown', (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault() // 阻止默认保存行为
        // 在这里执行保存操作，例如发送保存请求等
        this.saveDraft()
      }
    })
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },

  methods: {
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会
    },
    handleSave (event) {

    },
    saveDraft () {
      localStorage.setItem('article', JSON.stringify({
        title: this.title,
        html: this.html
      }))
      this.$message.success('保存成功')
    },
    submitArticle () {
      if (!this.title || !this.html) {
        this.$message.warning('标题和内容不能为空')
        return
      }
      const params = {
        title: this.title,
        content: this.html,
        authorId: this.userInfo.id,
        authorName: this.userInfo.username
      }
      this.$axios.post('/article', params).then(res => {
        this.$message.success(res.message)
        this.$router.push(`/article/${res.data.articleId}`)
      }).catch((err) => {
        this.$message.error(err.message)
      })
    }
  }
}
</script>
