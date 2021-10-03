<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  watch: {
    $route(to, from) {
      if (to.path != "/login") {
        let obj = {
          index: to.path,
          name: to.name,
          title: to.name === "index" ? "首页" : to.name,
        };
        this.$store.commit("addTab", obj);
      }
    },
  },
};
</script>
<style>
body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
