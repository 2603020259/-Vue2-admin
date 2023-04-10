<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
   components:{
   
   },
   mounted() {
        console.log(this);
    },
}
</script>

<style>
body,html,p{
  padding: 0;
  margin: 0;
}
</style>
