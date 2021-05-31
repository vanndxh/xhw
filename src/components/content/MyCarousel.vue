<template>
  <div class="block">
    <el-carousel type="card" height="500px">
<!--      <el-carousel-item v-for="item in CarouselPics" :key="item">-->
<!--        <img :src=item alt="" height="500" width="800">-->
<!--      </el-carousel-item>-->
      <el-carousel-item>
        <img src="../../assets/img/carousel/1.jpg" alt="" height="500" width="800">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/img/carousel/2.png" alt="" height="500" width="800">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/img/carousel/3.jpg" alt="" height="500" width="800">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/img/carousel/4.jpeg" alt="" height="500" width="800">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "MyCarousel",
  data() {
    return {
      CarouselPics: ['../../assets/img/carousel/1.jpg',
          '../../assets/img/carousel/2.png',
          '../../assets/img/carousel/3.jpg',
          '../../assets/img/carousel/4.jpg'
      ],
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