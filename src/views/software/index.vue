<template>
  <div class="app-container">
    <div class="flex flex-row">
      <el-button size="small" type="success" @click="toNew">New</el-button>
      <el-button v-if="selection.length > 0" size="small" type="danger" @click="multiRemove">{{ `Delete ${selection.length} software` }}</el-button>
      <div class="flex-grow-[1]" />
      <el-button size="small" type="primary" native-type="file" accept=".yml" @click="toUpload">Upload</el-button>
    </div>
    <el-table :data="list" @selection-change="handleSelectChange">
      <el-table-column type="selection" />
      <el-table-column label="name">
        <template slot-scope="scope">
          {{ scope.row }}
        </template>
      </el-table-column>
      <el-table-column label="operations">
        <template slot-scope="scope">
          <el-button size="small" @click="toEdit(scope.row)">Edit</el-button>
          <el-button size="small" type="primary" @click="toCopy(scope.row)">Copy</el-button>
          <el-button size="small" @click="toDownload(scope.row)">Download</el-button>
          <el-button size="small" type="danger" @click="remove(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as software from '@/api/software'

export default {
  data() {
    return {
      list: [],
      selection: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      software.selectall().then(res => {
        this.list.length = 0
        this.list.push(...res)
      })
    },
    toEdit(name) {
      this.$router.push(`/software/edit/${name}`)
    },
    toCopy(name) {
      let newName = name
      software.selectall().then(res => {
        for (;;newName = `${newName}_copy`) {
          if (res.filter(v => v === newName).length === 0) {
            software.select(name).then(res => {
              software.add(newName, res).then(() => {
                this.$message({
                  message: '复制成功',
                  type: 'success'
                })
                this.getData()
              })
            })
            break
          }
        }
      })
    },
    remove(name, requireConfirm = true, refresh = true) {
      const _remove = () => {
        software.remove(name).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          if (refresh) {
            this.getData()
          }
        })
      }
      if (requireConfirm) {
        this.$confirm(`确认删除 ${name} ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          _remove()
        })
      } else {
        _remove()
      }
    },
    toNew() {
      this.$router.push(`/software/new`)
    },
    handleSelectChange(selection) {
      this.selection.length = 0
      this.selection.push(...selection)
    },
    multiRemove() {
      this.$confirm(`确认删除 ${this.selection.join(', ')} ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.selection.forEach(v => {
          this.remove(v, false)
        })
        this.selection.length = 0
      })
    },
    toDownload(name) {
      software.select(name).then(res => {
        const blob = new Blob([res], { type: 'application/yaml' })
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = objectUrl
        link.setAttribute('download', 'docker-compose.yml')
        link.click()
        URL.revokeObjectURL(objectUrl)
      })
    },
    toUpload() {
      this.$router.push(`/software/upload`)
    }
  }
}
</script>
