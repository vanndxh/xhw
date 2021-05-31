<template>
  <div class="home">
    <tabBar></tabBar>
    <MyCarousel></MyCarousel>
    <bottom></bottom>
    <catgif></catgif>
  </div>
</template>

<script>
// @ is an alias to /src
import tabBar from "@/components/common/tabBar.vue";
import bottom from "@/components/common/bottom";
import MyCarousel from "@/components/content/MyCarousel";
import catgif from "@/components/common/catgif";


export default {
  name: 'Home',
  components: {
    tabBar, bottom, MyCarousel, catgif
  },
  data() {
    return {

    }
  },
  methods: {
    welcome() {
      this.$notify.info({
        title: '欢迎',
        message: '欢迎来到小黑屋，目前版本0.0.2'
      });
    },
  }
}


</script>

<style>

</style>
