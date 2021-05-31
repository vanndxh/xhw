<template>
  <div id="nav">
    <el-affix>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" active-text-color="#67C23A">
        <img src="@/assets/img/xhw.jpg" alt="xhw" width="120" height="80" align="right" style="outline: none">
        <el-menu-item index="1" class="el-menu-demo-else"><router-link to="/" class="a">首页</router-link></el-menu-item>
        <el-submenu index="2">
          <template #title>分区</template>
          <el-menu-item index="2-1"><router-link to="/Xian" class="a">大仙</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="/AG" class="a">成都AG</router-link></el-menu-item>
          <el-menu-item index="2-3"><router-link to="/Genshin" class="a">原神</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template #title>小黑档案室</template>
          <el-menu-item index="3-1"><router-link to="/Items" class="a">书本详情页</router-link></el-menu-item>
          <el-menu-item index="3-2"><router-link to="/Login" class="a">登录界面</router-link></el-menu-item>
          <el-menu-item index="3-3"><router-link to="/Mine" class="a">个人信息页</router-link></el-menu-item>
        </el-submenu>
        <el-menu-item index="4" disabled>未完待续</el-menu-item>
        <el-submenu index="5">
          <template #title>关于</template>
          <el-menu-item index="5-1"><router-link to="/AboutPage" class="a">开发日志</router-link></el-menu-item>
          <el-menu-item index="5-2"><router-link to="/Aboutxh" class="a">关于作者</router-link></el-menu-item>
        </el-submenu>

      </el-menu>
    </el-affix>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {

  }
}
</script>

<style scoped>
.a {
  text-decoration: none;
  color: #909399;
}
a:hover{
  color: #606266;
}
</style>