<template>
  <div class="block">
    <el-carousel type="card" height="300px" :interval="2500">
      <el-carousel-item>
        <img src="../../assets/img/carouselXian/1.jpeg" alt="" height="300" width="600">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/img/carouselXian/2.jpg" alt="" height="300" width="600">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/img/carouselXian/3.jpg" alt="" height="300" width="600">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/img/carouselXian/4.jpg" alt="" height="300" width="600">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/img/carouselXian/5.jpg" alt="" height="300" width="600">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/img/carouselXian/6.jpg" alt="" height="300" width="600">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "MyCarousel",
  data() {
    return {
    }
  }
}
</script>

<style scoped>
/*轮播图*/
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>