<template>
  <div>
    <div class="bg-white p-5">
      <div class="mb-3">
        用户列表
      </div>
      <el-table
        :data="userData"
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
          prop="username"
          label="用户名"
        />
        <el-table-column
          prop="createdAt"
          align="center"
          label="创建时间"
        >
          <template #default="{row}">
            {{ $dayJs(row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="role"
          align="center"
          label="角色"
        >
          <template #default="{row}">
            <el-select
              v-model="row.role"
              :disabled="disabledRoleSelect(row.role)"
              placeholder="请选择"
              @change="handleRoleChange(row.id, row.role)"
            >
              <el-option
                v-for="item in userOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
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
              :loading="userDataLoading"
              @click="handleDeleteUser(row.id)"
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
          :total="userData.length"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { roleEnum } from './js/enum'
export default {
  name: 'UserManage',

  data () {
    return {
      roleEnum,
      userOption: [
        {
          label: '普通用户',
          value: 0
        },
        {
          label: '管理员',
          value: 1
        },
        {
          label: '超级管理员',
          value: 2,
          disabled: false
        }
      ],
      userData: [],
      userDataLoading: false,
      pageConfig: {
        pageSize: 10,
        currentPage: 1
      }
    }
  },

  computed: {
    ...mapState(useUserStore, ['role'])
  },

  watch: {
    role: {
      handler (value) {
        if (value) {
          this.userOption[2].disabled = value !== 2
        }
      },
      immediate: true
    }
  },

  mounted () {
    this.getUserTable()
  },

  methods: {
    getUserTable () {
      this.$axios.get('/allUser').then(res => {
        this.userData = res.data
      })
    },
    handleDeleteUser (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUser(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteUser (id) {
      this.userDataLoading = true
      this.$axios.delete(`/user/${id}`).then(() => {
        this.$message.success('删除成功')
        this.getUserTable()
      }).catch(err => {
        this.$message.error(err.message)
      }).finally(() => {
        this.userDataLoading = false
      })
    },
    handleRoleChange (id, role) {
      this.$axios.put('/user/role', { id, role }).then(() => {
        this.$message.success('修改成功')
        this.getUserTable()
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    disabledRoleSelect (role) {
      if (role > this.role) {
        return true
      }
    }
  }
}
</script>
