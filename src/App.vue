<template>
  <router-view/>
</template>

<script>
export default {
  mounted() {
    this.$store.state.axios.defaults.headers['Authorization'] = "Bearer " + this.$store.state.token
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
