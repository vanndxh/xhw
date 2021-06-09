<template>
  <div>
    <el-backtop target=""></el-backtop>
    <tabBar></tabBar>
    <!--bgmControl-->
    <div align="right">
      <i class="el-icon-video-play"></i>
      bgm:复杂
      <el-switch
          v-model="isActive"
          active-color="#13ce66"
          inactive-color="#DCDFE6"
          @change="switchChange">
      </el-switch>
      <audio id="bgm" hidden>
        <source src="../assets/bgm/complex.mp3" type="audio/mpeg">
      </audio>
    </div>
    <!--main-->
    <el-row>
      <el-col :span="16" :push="4">
        <!--大标题-->
        <h1 style="font-size:50px; font-family: 华文行楷">指法芬芳张大仙</h1>
        <!--轮播图-->
        <CarouselXian></CarouselXian>
        <!--仙人指路-->
        <div id="xianurl" align="left">
          <h2 align="left"><i class="el-icon-s-promotion"></i>仙人指路</h2>
          <TableXian></TableXian>
        </div>
        <!--XYG-->
        <div align="left">
          <h2><i class="el-icon-trophy"></i>XYG</h2>
          <el-card>
            <el-tooltip class="item" effect="light" content="点击跳转官博" placement="top">
              <h3 style="font-family: 华文行楷; outline: none" align="center" @click="toXYG">XYG电子竞技俱乐部</h3>
            </el-tooltip>
            <h4>荣誉</h4>
            <ul>
              <li>2020王者荣耀WCG冠军</li>
              <li>2020王者荣耀TGA冠军</li>
              <li>第二届王者荣耀全国大赛冠军</li>
              <li>2021KGL春季赛亚军</li>
            </ul>
            <div align="center">
              <img src="../assets/img/XYG.jpg" alt="XYG" style="width: 30%" @click="toXYGVideo">
            </div>
          </el-card>
        </div>
        <!--仙闻-->
        <div>
          <h2 align="left"><i class="el-icon-s-opportunity"></i>仙闻</h2>
          <el-card>
            暂时没啥内容~
          </el-card>
        </div>
        <!--精彩视频-->
        <div align="left">
          <h2 align="left"><i class="el-icon-monitor"></i>精彩视频</h2>
          <el-card>
            <p class="a">tip:点击可直接跳转哦~</p>
            <img src="../assets/img/video1.png" alt="video1" @click="clickVideo1">
            <img src="../assets/img/video2.png" alt="video2" @click="clickVideo2">
            <img src="../assets/img/video3.png" alt="video3" @click="clickVideo3">
            <p class="a">
              更多内容关注小黑b站账号哟~
              <el-button @click="toBili" type="primary" size="mini" plain>Bilibili</el-button>
            </p>
          </el-card>
        </div>

      </el-col>
    </el-row>
  </div>
  <bottom></bottom>
  <catgif></catgif>
</template>

<script>
import tabBar from "@/components/common/tabBar";
import bottom from "@/components/common/bottom";
import TableXian from "@/components/content/TableXian";
import CarouselXian from "@/components/content/CarouselXian";
import catgif from "@/components/common/catgif";

export default {
  name: "Xian",
  data() {
    return {
      isActive: false,
      urlVideo1: 'https://www.bilibili.com/video/BV1HK4y1a7un',
      urlVideo2: 'https://www.bilibili.com/video/BV1na4y177pk',
      urlVideo3: 'https://www.bilibili.com/video/BV11Q4y1K7yw',
      urlBili: "https://space.bilibili.com/363270906",
      urlXYG: 'https://weibo.com/u/7496689580',
      urlXYGVideo: 'https://www.bilibili.com/video/BV12v411a7MX'
    }
  },
  components: {
    tabBar, bottom, TableXian, CarouselXian, catgif
  },
  methods: {
    switchChange() {
      if (this.isActive) {
        document.getElementById('bgm').play();
      } else {
        document.getElementById('bgm').pause()
      }
    },
    clickVideo1() {
      let tempWindow = window.open('_blank');
      tempWindow.location = this.urlVideo1;
    },
    clickVideo2() {
      let tempWindow = window.open('_blank');
      tempWindow.location = this.urlVideo2;
    },
    clickVideo3() {
      let tempWindow = window.open('_blank');
      tempWindow.location = this.urlVideo3;
    },
    toBili() {
      let tempWindow = window.open('_blank');
      tempWindow.location = this.urlBili;
    },
    toXYG() {
      let tempWindow = window.open('_blank');
      tempWindow.location = this.urlXYG;
    },
    toXYGVideo() {
      let tempWindow = window.open('_blank');
      tempWindow.location = this.urlXYGVideo;
    }
  }
}
</script>

<style scoped>
.drawer:first-line {
  text-indent: 28px;
  width: 100px;
}
.a {
  font-size: 14px;
  text-indent: 2em;
}
</style>