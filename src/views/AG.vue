<template>
  <div>
<!--    tabBar-->
    <tabBar></tabBar>
<!--    bgmControl-->
    <div align="right">
      <i class="el-icon-video-play"></i>
      bgm:heroes
      <el-switch
          v-model="isActive"
          active-color="#13ce66"
          inactive-color="#DCDFE6"
          @change="switchChange">
      </el-switch>
      <audio id="bgm" hidden>
        <source src="../assets/bgm/heroes.mp3" type="audio/mpeg">
      </audio>
    </div>

<!--    main-->
    <el-container>
      <el-aside width="200px">
        ppp
      </el-aside>

      <div style="border:1px solid; float:left; height:1000px;"></div>

      <el-main>
        ppp
      </el-main>
    </el-container>
<!--    bottom-->
    <bottom></bottom>
  </div>
</template>

<script>
import tabBar from "@/components/common/tabBar";
import bottom from "@/components/common/bottom";
// import { Anchor } from 'view-design';

export default {
  name: "AG",
  data() {
    return {
      isActive: false
    }
  },
  components: {
    tabBar, bottom
  },
  methods: {
    switchChange() {
      if(this.isActive) {
        document.getElementById('bgm').play();

      }
      else {
        document.getElementById('bgm').pause()
      }
    }
  }
}
</script>

<style scoped>
.el-aside {
  background-color: #FFFFFF;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #FFFFFF;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>