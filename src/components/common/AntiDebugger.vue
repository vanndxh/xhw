<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "AntiDebugger"
}

setInterval(function() {
  check();
}, 2000);
var check = function() {
  function doCheck(a) {
    if (('' + a / a)['length'] !== 1 || a % 20 === 0) {
      (function() {}['constructor']('debugger')());
    } else {
      (function() {}['constructor']('debugger')());
    }
    doCheck(++a);
  }
  try {
    doCheck(0);
    // eslint-disable-next-line no-empty
  } catch (err) {}
};
check();

</script>

<style scoped>

</style>