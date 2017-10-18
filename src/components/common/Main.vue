<template>
  <div>
    <header-top></header-top>
    <div class="layout-content-main">
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
  import headerTop from "./header.vue"
  export default {
    components:{
      headerTop
    },
  }
</script>
