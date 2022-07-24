<script setup lang="ts">
import Babysitter from "./components/Babysitter.vue";
</script>

<template>
  <header>
    <h1>Northwoods Babysitter Kata</h1>
  </header>
  <main>
    <div id="BabySitterDiv">
      <Babysitter />
    </div>
  </main>
</template>

<style scoped>

  header {
    background-color: aqua;
    color: black;
    -webkit-text-fill-color: white;
    -webkit-text-fill-color: white;
    -webkit-text-stroke-width: .5px;
    font-family: 'Impact';
    padding-left: 2%;
  }

  #BabySitterDiv {
    background-color: rgb(194, 200, 255);
  }
</style>
