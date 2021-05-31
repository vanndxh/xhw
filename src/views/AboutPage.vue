<template>
  <tabBar></tabBar>
  <div class="block">
    <el-row>
      <el-col :span="16" :push="4">
        <Log></Log>
      </el-col>
    </el-row>
  </div>
  <bottom></bottom>
  <catgif></catgif>
</template>


<script>
import tabBar from "@/components/common/tabBar";
import bottom from "@/components/common/bottom";
import Log from "@/components/content/Log";
import catgif from "@/components/common/catgif";

export default {
  data() {
    return {
      activities: []
    };
  },
  components: {
    tabBar, bottom, Log, catgif
  },
  methods: {
  }
};
</script>

<style scoped>

</style>