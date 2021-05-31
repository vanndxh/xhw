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
        <!--仙闻-->
        <div>
          <h2 align="left"><i class="el-icon-s-opportunity"></i>仙闻</h2>
          <el-card>
            还在写。。。
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
  }
}
</script>

<style scoped>
.drawer:first-line {
  text-indent: 28px;
  width: 100px;
}
</style>