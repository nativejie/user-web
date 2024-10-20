<template>
  <el-dialog
    title="留言板"
    :visible.sync="dialogVisible"
    :before-close="onClose"
    width="632px"
  >
      <img src="@/assets/images/no-message.png" style="width: 592px;" />
      <span slot="footer" class="dialog-footer">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">新增留言</el-button>
      </span>
  </el-dialog>
</template>

<script>
import { addProcessNote, getProcessNote } from "@/api/order";
export default {
  props: {
    dialogVisible: Boolean,
    onClose: Function,
    processId: String,
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    handleAdd() {
      this.$prompt('', {
          title: "留言内容",
          confirmButtonText: '确定留言',
          cancelButtonText: 'Cancel',
        }).then(({ value }) => {
          addProcessNote({
            note: value,
            processId: this.processId
          }).then(res => {
            this.handleGet();
          });
          this.onClose();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },
    handleGet() {
      getProcessNote(this.processId).then(res => {
        console.log('index~52 res：', res);
        this.list = res
      });
    }
  },
  mounted() {
    this.handleGet();
  }
}
</script>

<style lang="scss" scoped>

</style>