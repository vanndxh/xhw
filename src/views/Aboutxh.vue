<template>
  <div>
    <!--导航栏-->
    <tabBar></tabBar>
    <!--头像-->
    <div class="demo-basic--circle">
      <div class="block">
        <el-avatar :size="80" :src="urlBlack"></el-avatar>
      </div>
    </div>
    <h1 style="font-family: 华文行楷">van能的小黑</h1>
    <!--主要内容，各种链接-->
    <div>
      <el-row>
        <el-col :span="18" :push="3"><Table></Table></el-col>
      </el-row>
    </div>
    <br>
    <el-badge :value="1" class="item" type="danger">
      <el-button type="success" plain @click="supportxh">支持小黑</el-button>
    </el-badge>
    <el-row>
      <el-col :span="10" :push="7">
        <el-card v-show="showQR">
          <el-row>
            <el-col :span="12">
              <img src="../assets/img/QR.png" alt="wechatQR" width="270" height="348">
            </el-col>
            <el-col :span="12">
              <img src="../assets/img/zfb.jpg" alt="zfbQR" width="278" height="348">
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <!--底部栏-->
  <bottom></bottom>
  <catgif></catgif>
</template>

<script>
import tabBar from "@/components/common/tabBar";
import bottom from "@/components/common/bottom";
import Table from "@/components/content/Table";
import catgif from "@/components/common/catgif";


export default {
  name: "Aboutxh",
  components: {
    tabBar, bottom, Table, catgif
  },
  methods: {
    supportxh() {
      if(!this.showQR) {
        this.showQR = true;
        this.$notify.info({
          title: '提示',
          message: '再次点击按钮关闭二维码',
          duration: 2500
        });
      }
      else {
        this.showQR = false
      }
    }
  },
  data() {
    return {
      urlBlack: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2178438322,2539713157&fm=26&gp=0.jpg",
      showQR: false
    }
  },

}
</script>

<style>

</style>