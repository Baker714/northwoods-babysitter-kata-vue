<script setup lang="ts">
import { onBeforeUpdate, onUpdated, ref } from "vue";

const timeMap = [17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4];

const startBedPay = 12;
const bedMidnightPay = 8;
const midnightEndPay = 16;

const pay = ref(0);
const startTimeVal = ref("");
const bedTimeVal = ref("");
const endTimeVal = ref("");
const errorMessage = ref("");
const midnight = timeMap.indexOf(0);

onUpdated(() => {
  startTimeVal.value = startTimeVal.value.split(":")[0] + ":00";
  bedTimeVal.value = bedTimeVal.value.split(":")[0] + ":00";
  endTimeVal.value = endTimeVal.value.split(":")[0] + ":00";
});

function calculatePay() {
  errorMessage.value = "";
  const bedTimePresent = bedTimeVal.value !== ":00";
  const bedHour = bedTimePresent
    ? timeMap.indexOf(+bedTimeVal.value.split(":")[0])
    : 0;
  const startHour = timeMap.indexOf(+startTimeVal.value.split(":")[0]);
  const endHour = timeMap.indexOf(+endTimeVal.value.split(":")[0]);

  if (!validateData(startHour, endHour, bedTimePresent, bedHour)) return;

  if (bedTimePresent && midnight > bedHour) {

    if(endHour < midnight)
        pay.value =
            (bedHour - startHour) * startBedPay +
            (endHour - bedHour) * bedMidnightPay
    else
        pay.value =
            (bedHour - startHour) * startBedPay +
            (midnight - bedHour) * bedMidnightPay +
            (endHour - midnight) * midnightEndPay;
  } else {

    if (endHour >= midnight && startHour < midnight)
      pay.value =
        (midnight - startHour) * startBedPay +
        (endHour - midnight) * midnightEndPay;
    else if (endHour < midnight && startHour < midnight)
      pay.value = (endHour - startHour) * startBedPay;
    else pay.value = (endHour - startHour) * midnightEndPay;
  }
}

function validateData(
  startHour: number,
  endHour: number,
  bedTimePresent: boolean,
  bedHour: number
) {
  if (startHour === -1) {
    errorMessage.value += "Start time must be 5:00 p.m. or later.\n";
    return false;
  }

  if (endHour === -1) {
    errorMessage.value += "End time must be 4:00 a.m. or earlier.\n";
    return false;
  }

  if (endHour < startHour) {
    errorMessage.value += "Start time must be before end time.\n";
    return false;
  }

  if (
    bedTimePresent &&
    (bedHour < startHour ||
      bedHour > endHour ||
      (bedHour === -1 && bedHour > 0))
  ) {
    errorMessage.value += "Bed time must be between start time and end time.\n";
    return false;
  }

  return true;
}
</script>

<template>
  <main>
    <form onsubmit="return false">
      <h1 id="errorMessage">{{ errorMessage }}</h1>
      <br />
      <h4>* = Required</h4>
      <label for="startTime">Start Time* : </label>
      <input
        id="startTime"
        v-model="startTimeVal"
        type="time"
        step="3600"
        required
      />
      <br />
      <label for="bedTime">Bed Time : </label>
      <input id="bedTime" v-model="bedTimeVal" type="time" step="3600"/>
      <br />
      <label for="endTime">End Time* : </label>
      <input
        id="endTime"
        v-model="endTimeVal"
        type="time"
        step="3600"
        required
      />
      <br />
      <br />
      <button id="calcPayBtn" type="submit" @click="calculatePay">
        Calculate Pay
      </button>
      <br />
      <br />
      <h1 id="payField">$ {{ pay }}</h1>
    </form>
  </main>
</template>

<style scoped>
#errorMessage {
  color: red;
  padding-top: 5px;
}

main {
    padding-left: 10px;
    padding-bottom: 10px;
}

label {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

button {
    background-color: rgb(255, 225, 251);
}

</style>
