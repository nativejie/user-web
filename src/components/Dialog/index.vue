<template>
  <div class="base-dialog">
    <el-dialog
      class="my-dialog"
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="onClose"
      show-close
    >
      <slot></slot>
      <span slot="footer" class="dialog-footer">
        <el-button round v-if="leftBtnText" @click="onCancel">{{ leftBtnText }}</el-button>
        <el-button round v-if={rightBtnText} type="danger" @click="onConfirm">{{ rightBtnText }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      leftBtnText: {
        type: String,
        default: 'Cancel'
      },
      rightBtnText: {
        type: String,
        default: 'Confirm'
      },
      dialogVisible: Boolean,
      onCancel: Function,
      onConfirm: Function,
      onClose: Function
    },
    data: function() {
      return {

      }
    },
  }
</script>

<style lang="scss" scoped>
// .el-dialog {
//     border-radius: 12px !important;
// }
</style>