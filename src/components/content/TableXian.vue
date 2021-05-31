<template>
  <el-table
      :data="tableData"
      style="width: 100%"
      :stripe="true"
      :border="true">

    <el-table-column
        label="平台"
        width="340"
        align="center">
      <template #default="scope">
        <span style="margin-left: 10px">{{ scope.row.platform }}</span>
      </template>
    </el-table-column>

    <el-table-column
        label="账户"
        width="340"
        align="center">
      <template #default="scope">
        <span style="margin-left: 10px">{{ scope.row.userName }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button
            @click="handleEnter(scope.$index)">进入
        </el-button>

      </template>
    </el-table-column>

  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        platform: '虎牙',
        userName: '张大仙',
      },
        {
          platform: 'Bilibili',
          userName: '指法芬芳张大仙',
        },
        {
          platform: '微博',
          userName: '指法芬芳张大仙z',
        },
        {
          platform: '虎牙小号',
          userName: '张冰心',
        },],
      urlHuya: 'https://www.huya.com/688',
      urlBili: 'https://space.bilibili.com/1935882',
      urlWeibo: 'https://weibo.com/u/1811893237',
      urlHuya2: 'https://www.huya.com/2688'
    }
  },
  methods: {
    handleEnter(index) {
      if(index === 0) {
        let tempWindow=window.open('_blank');
        tempWindow.location= this.urlHuya;
      }
      else if(index === 1) {
        let tempWindow=window.open('_blank');
        tempWindow.location= this.urlBili;
      }
      else if(index === 2) {
        let tempWindow=window.open('_blank');
        tempWindow.location= this.urlWeibo;
      }
      else {
        let tempWindow=window.open('_blank');
        tempWindow.location= this.urlHuya2;
      }
    }
}
}
</script>

<style scoped>

</style>