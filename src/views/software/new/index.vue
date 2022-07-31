<template>
  <div class="app-container flex flex-col">
    <div class="mb-4 flex flex-row">
      <el-button size="small" @click="back">返回</el-button>
      <el-input v-model="name" class="el-button" style="width: 12em; padding: 0;" />
      <el-button size="small" type="warning" @click="save">保存</el-button>
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
      name: '',
      text: ''
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    save() {
      if (this.name) {
        software.add(this.name, this.text).then(() => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.$router.push('/software/index')
        })
      } else {
        this.$message({
          message: '请输入名称',
          type: 'info'
        })
      }
    }
  }
}
</script>
