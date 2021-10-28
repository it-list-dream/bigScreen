<template>
  <div id="app">
    <router-view></router-view>
    <!-- <Layout></Layout> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Layout from "./views/Layout.vue";
export default {
  name: "App",
  components: {
    // HelloWorld
    Layout,
  },
};
</script>

<style>
html {
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  /* overflow-x:hidden !important; */
  /* overflow-y:hidden !important; */
  /* overflow: hidden; */
}
</style>
