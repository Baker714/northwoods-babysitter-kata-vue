<script setup lang="ts">
import Babysitter from "./components/Babysitter.vue";
</script>

<template>
  <header>
    <h1>Northwoods Babysitter Kata</h1>
    <h3>by Andrew Baker</h3>
  </header>
  <main>
    <div id="BabySitterDiv">
      <Babysitter/>
    </div>
  </main>
</template>

<style scoped>
  header {
    background-color: aqua;
    
  }

  h1 {
    background-color: aqua;
    color: black;
    -webkit-text-fill-color: white;
    -webkit-text-fill-color: white;
    -webkit-text-stroke-width: .5px;
    font-family: 'Impact';
    padding-left: 10px;
    padding-top: 5px;
  }

  h3 {
        padding-left: 10px;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        padding-bottom: 10px;
  }

  #BabySitterDiv {
    background-color: rgb(194, 200, 255);
  }
</style>
