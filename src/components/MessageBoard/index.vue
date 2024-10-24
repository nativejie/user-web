<template>
  <el-dialog
    title="留言板"
    :visible.sync="dialogVisible"
    :before-close="onClose"
    width="632px"
  >
      <img v-if="!list.length" src="@/assets/images/no-message.png" style="width: 592px;" />
      <div class="msg-box" v-else>
        <div class="msg-item" v-for="(item, index) in list" :key="index">
          <div class="msg-item-top flex-row justify-between">
            <p class="msg-item-top-left">{{ item.noteManName || '-' }}</p>
            <p class="msg-item-top-right">{{ item.createTimeStr }}</p>
          </div>
          <div class="msg-item-bottom flex-row justify-start">{{ item.note }}</div>
        </div>
      </div>
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
        this.list = res.data || [];
      });
    }
  },
  mounted() {
    this.handleGet();
  }
}
</script>

<style lang="scss" scoped>
.msg-box {
  width: 592px;
  height: 452px;
  background-color: #F8F9FC;
  padding: 16px 24px;
  overflow-y: scroll;
  .msg-item {
    background-color: #fff;
    width: 100%;
    font-size: 14px;
    padding: 12px;
    border-radius: 8px;
    margin-top: 16px;

    .msg-item-top {
      height: 26px;
      line-height: 26px;
      border-bottom: 1px solid #EEEFF2;
      .msg-item-top-left {
        font-size: 14px;
        line-height: 22px;
        color: #1D2129;
      }
      .msg-item-top-right {
        font-size: 14px;
        color: #C0C5CF;
      }
    }
    .msg-item-bottom {
      padding-top: 8px;
      flex-wrap: wrap;
      line-height: 23px;
      font-size: 14px;
      color: #1D2129;
    }
  }
}
</style>