<template>
  <div align="left">
    <el-row>
      <el-col :span="1">
        <el-affix position="bottom" :offset="20">
          <el-popover
              placement="top-start"
              :width="200"
              trigger="click"
              content="别摸我了，给小黑打个赏吧~"
              :auto-close="2500"
          >
            <template #reference>
              <img src="../../assets/cat.gif" alt="catgif" style="width: 150px; height: 150px; outline: none">
            </template>
          </el-popover>
        </el-affix>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "catgif",
  data() {
    return {
      fix: 1
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>