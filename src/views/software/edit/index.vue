<template>
  <div class="app-container flex flex-col">
    <div class="mb-4 flex flex-row">
      <el-button size="small" @click="back">返回</el-button>
      <el-button size="small" type="warning" @click="save">保存</el-button>
      <el-button size="small" type="danger" @click="remove">删除</el-button>
      <el-input v-model="newName" class="el-button" style="width: 12em; padding: 0;" />
      <div class="flex-grow-[1]" />
    </div>
    <MonacoEditor v-model="text" class="flex-grow-[1]" language="yaml" />
  </div>
</template>

<script>
import * as software from '@/api/software'
import MonacoEditor from 'vue-monaco'

export default {
  components: {
    MonacoEditor
  },
  data() {
    return {
      name: this.$router.currentRoute.params['name'],
      newName: this.$router.currentRoute.params['name'],
      text: ''
    }
  },
  created() {
    software.select(this.name).then(res => {
      this.text = res
    })
  },
  methods: {
    back() {
      this.$router.back()
    },
    remove() {
      this.$confirm(`确认删除 ${this.name} ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        software.remove(this.name).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.back()
        })
      })
    },
    save() {
      software.add(this.newName, this.text).then(() => {
        console.log(this.newName, this.name)
        if (this.newName !== this.name) {
          software.remove(this.name).then(() => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          })
        }
        this.$router.push('/software/index')
      })
    }
  }
}
</script>
