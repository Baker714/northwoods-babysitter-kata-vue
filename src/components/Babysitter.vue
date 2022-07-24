<script setup lang="ts">
import { ref } from 'vue';

const startBedPay = 12;
const bedMidnightPay = 8;
const midnightEndPay = 16;

const pay = ref(0);
const startTime = ref("");
const bedTime = ref("");
const endTime = ref("");


function calculatePay() {
}

</script>

<template>
  <main>
    <form>
        <label for="startTime">Start Time: </label>
        <input id="startTime" v-model="startTime" type="time" required/>
        <br>
        <label for="bedTime">Bed Time: </label>
        <input id="bedTime" v-model="bedTime" type="time"/>
        <br>
        <label for="endTime">End Time: </label>
        <input id="endTime" v-model="endTime" type="time" required/>
        <br>
        <br>
        <button id="calcPayBtn" type="submit" @click="calculatePay">Calculate Pay</button>
        <br>
        <br>
        <h id="payField">$ {{ pay }}</h>
    </form>
  </main>
</template>

<style scoped>
</style>