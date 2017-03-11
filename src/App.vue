<template lang="jade">
#App
    router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import './assets/base/weui.min.css';
@import './assets/font-awesome/css/font-awesome.min.css';
.navlist .icon{
    background: url("./assets/base/home3.png");
    background-size:280px 130px;
}
#app {
}
</style>
