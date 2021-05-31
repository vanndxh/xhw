<template>

  <el-table
      :data="tableData"
      style="width: 100%"
      :stripe="true"
      :border="true">

    <el-table-column
        label="平台"
        width="380"
        align="center">
      <template #default="scope">
        <span style="margin-left: 10px">{{ scope.row.platform }}</span>
      </template>
    </el-table-column>

    <el-table-column
        label="账户"
        width="380"
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
      tableData: [
        {
          platform: 'QQ',
          userName: '1025196468',
        },
        {
          platform: 'Bilibili',
          userName: 'van能的小黑',
        },
        {
          platform: '微博',
          userName: 'van能的小黑',
        },
        {
          platform: 'Github',
          userName: 'vanndxh',
        },
      ],
      urlBili: "https://space.bilibili.com/363270906",
      urlWeibo: "https://weibo.com/6864286293/profile?rightmod=1&wvr=6&mod=personinfo",
      urlGit: "https://github.com/vanndxh?tab=repositories",
    }
  },
  methods: {
    handleEnter(index) {
      if (index === 0) {
        this.$alert('没有设置链接，可以手动搜索哦~', '提示', {
          confirmButtonText: '确定',
          center: false
        })
      } else if (index === 1) {
        let tempWindow = window.open('_blank');
        tempWindow.location = this.urlBili;
      } else if (index === 2) {
        let tempWindow = window.open('_blank');
        tempWindow.location = this.urlWeibo;
      } else {
        let tempWindow = window.open('_blank');
        tempWindow.location = this.urlGit;
      }
    }
  }
}
</script>

<style>

</style>
