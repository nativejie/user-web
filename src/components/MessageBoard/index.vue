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
export default {
  props: {
    dialogVisible: Boolean,
    onClose: Function
  },
  methods: {
    handleAdd() {
      this.$prompt('', {
          title: "留言内容",
          confirmButtonText: '确定留言',
          cancelButtonText: 'Cancel',
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: `留言内容：${value}`
          });
          this.onClose();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>