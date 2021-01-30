<template>
  <Dashboard/>
</template>

<script>
import Dashboard from './components/Dashboard.vue'

export default {  
  name: 'App',
  components: {
    Dashboard,
  }
};
</script>

<style>
body {
  text-align: center;
}
.country-image {
  max-height: 60vh;
}
@media screen and (max-width: 767px){
  .country-image{
    padding: 0 5vw;
  }
}
</style>
