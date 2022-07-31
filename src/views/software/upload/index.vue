<template>
  <div class="app-container flex-grow-[1] flex flex-col items-center">
    <div class="flex flex-row self-stretch">
      <div>
        <el-button size="small" @click="toBack">返回</el-button>
      </div>
      <div class="flex-grow-[1]" />
      <el-collapse :value="['0']">
        <el-collapse-item name="0" title="上传文件">
          <el-upload drag multiple action="" :auto-upload="false" :on-change="handleOnChange">
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">可以上传多个文件，且不限制文件类型和大小</div>
          </el-upload>
        </el-collapse-item>
      </el-collapse>
      <div class="flex-grow-[1]" />
    </div>
    <div class="self-stretch flex flex-row justify-around">
      <el-button v-if="selectList.length > 0" size="small" type="success" @click="toMultiSave">保存</el-button>
      <el-button v-if="selectList.length > 0" size="small" type="danger" @click="toMultiRemove">删除</el-button>
    </div>
    <el-table :data="uploadList" @selection-change="handleSelectChange">
      <el-table-column type="selection" />
      <el-table-column label="Name" prop="name">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" />
        </template>
      </el-table-column>
      <el-table-column label="File" prop="file" />
      <el-table-column label="Operations">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="toSave(scope.row, scope.$index)">保存</el-button>
          <el-button size="small" type="danger" @click="toRemove(scope.$index)">删除</el-button>
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
      uploadList: [],
      selectList: []
    }
  },
  methods: {
    handleOnChange(file, fileList) {
      const reader = new FileReader()
      reader.readAsText(file.raw, 'utf-8')
      reader.onload = () => {
        this.uploadList.push({
          name: file.uid,
          file: file.name,
          text: reader.result
        })
      }
    },
    handleSelectChange(selection) {
      this.selectList.length = 0
      this.selectList.push(...selection)
    },
    toSave(data, index, remove = true) {
      software.add(data.name, data.text).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        if (remove) this.toRemove(index)
      })
    },
    toRemove(index) {
      this.uploadList = this.uploadList.filter((v, i) => i !== index)
    },
    toMultiSave() {
      this.selectList.forEach((v, i) => {
        this.toSave(v, i, false)
      })
      this.toMultiRemove()
    },
    toMultiRemove() {
      this.uploadList = this.uploadList.filter(v => this.selectList.filter(vv => vv === v).length === 0)
    },
    toBack() {
      this.$router.back()
    }
  }
}
</script>
