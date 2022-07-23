<script setup lang="ts">
import { ref } from 'vue';

const pay = ref(0.00);

function calculatePay() {
    pay.value++;
}

</script>

<template>
  <main>
    <label for="startTime">Start Time: </label>
    <input id="startTime" type="text"/>
    <br>
    <label for="bedTime">Bed Time: </label>
    <input id="bedTime" type="text"/>
    <br>
    <label for="endTime">End Time: </label>
    <input id="endTime" type="text"/>
    <br>
    <br>
    <button @click="calculatePay">Calculate Pay</button>
    <br>
    <br>
    <h>{{ pay }}</h>
  </main>
</template>

<style scoped>

</style>