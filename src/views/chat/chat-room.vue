<template>
  <div class="flex justify-center">
    <div
      v-if="showChatRoom"
      class="w-1/2 bg-gray-100 chat-container flex flex-col rounded-md"
    >
      <div class="flex justify-center w-full h-12 text-base pt-2 chat-header">
        聊天室: {{ roomId }}
      </div>
      <div
        ref="content"
        class="content flex flex-col mt-2 flex-1"
      />
      <div class="bg-white input-area">
        <el-input
          v-model="chat"
          type="textarea"
          size="large"
          resize="none"
          rows="3"
          class="input-textarea"
        />
        <div class="flex justify-end mb-2 mr-2">
          <el-button
            type="primary"
            size="default"
            @click="sendChat"
          >
            发送
          </el-button>
        </div>
      </div>
    </div>
    <el-col
      v-else
      :sm="12"
      :lg="6"
    >
      <el-result
        icon="info"
        title="信息提示"
        sub-title="请刷新输入房间号"
      />
    </el-col>
    <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="500"
    >
      <span>请输入聊天室ID:</span>
      <el-input
        v-model="roomId"
        size="large"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button
            size="default"
            @click="dialogVisible = false"
          >
            取消
          </el-button>
          <el-button
            type="primary"
            size="default"
            @click="joinRoom"
          >
            加入房间
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
export default {
  name: 'ChatRoom',

  data () {
    return {
      chat: '',
      roomId: '',
      showChatRoom: false,
      dialogVisible: true,
      socket: null,
      chatMessageList: []
    }
  },

  computed: {
    ...mapState(useUserStore, ['userInfo'])
  },

  watch: {
    chatMessageList: {
      handler (list) {
        const item = list[list.length - 1]
        if (item.type === 1) {
          const div = document.createElement('div')
          div.classList.add('flex', 'justify-center')
          div.innerHTML = item.data
          this.$nextTick(() => {
            this.$refs.content.appendChild(div)
          })
        }
        if (item.type === 2) {
          const { userId, username, data } = item
          const div = document.createElement('div')
          div.classList.add('flex', 'items-center', 'mt-2', 'mb-2')
          if (userId === this.userInfo.id) {
            div.classList.add('mr-2', 'justify-end')
          } else {
            div.classList.add('ml-2', 'justify-start')
          }
          div.innerHTML = `
            <img
              src=${item.avatar}
              alt="!"
              width="50"
              height="50"
            >
            <div class="ml-2">
              <div>${username}</div>
              ${data}
            </div>`
          this.$nextTick(() => {
            this.$refs.content.appendChild(div)
          })
        }
        this.roomId = item.roomID
      },
      deep: true
    }
  },

  beforeUnmount () {
    if (this.socket) {
      this.socket.close()
    }
  },

  mounted () {
  },

  created () {

  },

  methods: {
    joinRoom () {
      this.socket = new WebSocket('ws://127.0.0.1:7001/ws/join')
      this.socket.onopen = () => {
        this.socket.send(JSON.stringify(['join', { roomID: this.roomId, username: this.userInfo.username }]))
      }
      this.socket.onmessage = (message) => {
        const data = JSON.parse(message.data)
        if (data.type !== 0) {
          this.dialogVisible = false
          this.showChatRoom = true
          this.chatMessageList.push(data)
        }
      }
    },
    sendChat () {
      const { id, username, avatar } = this.userInfo
      this.socket.send(JSON.stringify(['chat', { roomID: this.roomId, userId: id, username, content: this.chat, avatar }]))
      this.chat = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .chat-container{
    height: 700px;
  }

  .chat-header{
    border-bottom: 1px solid #666;
  }

  :deep .input-textarea .el-textarea__inner{
    box-shadow: none;
  }

  .input-area{
    border-top: 1px solid #E5E5E5;
  }
</style>
