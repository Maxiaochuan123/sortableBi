<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
     </transition>
  </div>
</template>

<script>
// import echarts from '../static/script/echarts.js'
export default {
  name: 'App'
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  html,body,#app{
    height: 100%;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
