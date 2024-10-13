<template>
  <div class="prview-model base-gray-bg mt16">
    <div v-for="item in 3" :key="item" class="modal-item flex-row justify-start">
      <p class="modal-item-name">扫描对象{{ item }}</p>
      <div class="modal-item-desc">
        <i class="el-icon-printer" />
        File name File name File name File name.obj{{ item }}
      </div>
      <el-link type="danger">Preview</el-link>
    </div>

    <p class="warn-info">
      接受打印后，我们将尽快为您打印模型。如果不满意也可以发起申请重新建模或放弃打印。</br >
      <i class="gray">*请注意，即使放弃打印，已支付的定金也无法退还。</i>
    </p>
    <div class="print-btn-line flex-row justify-between">
      <el-link type="danger" @click="handleOpenMessageBoard">
        <i class="el-icon-receiving"></i>
        留言板
      </el-link>

      <div class="btn-group">
        <el-button type="danger" round @click="handlePrint">接受打印</el-button>
        <el-link type="danger" @click="handeleCancelPrint" style="margin-left: 16px;">放弃打印</el-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      handlePrint() {
        this.$alert('我们将尽快为您制作模型。', '感谢您选择接受打印！', {
          confirmButtonText: 'ok',
          callback: action => {
            this.$message({
              type: 'warn',
              message: `action: ${ action }`
            });
          }
        });
      },
      handeleCancelPrint () {
        this.$prompt('请注意：放弃后您的订单将关闭，且定金无法退回!', '您即将放弃打印', {
          confirmButtonText: '确定放弃',
          cancelButtonText: '取消',
          inputPlaceholder: '请告诉我们你放弃打印的原因'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
.prview-model {
  .modal-item {
    font-size: 14px;
    .modal-item-name {
      width: 66px;
      font-size: 14px;
      margin-right: 36px;
      color: #1D2129;
    }
    .modal-item-desc {
      margin-right: 16px;
      color: #1D2129;
    }
  }

  .warn-info {
    font-size: 14px;
    color: #1D2129;
    margin-top: 20px;
    .gray {
      font-style: normal;
      color: #929DAA;
    }
  }

  .print-btn-line {
    margin-top: 38px;
  }
}
</style>