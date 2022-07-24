<script setup lang="ts">
import { ref } from 'vue';

const timeMap = [17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4];

const startBedPay = 12;
const bedMidnightPay = 8;
const midnightEndPay = 16;

const pay = ref(0);
const startTime = ref("");
const bedTime = ref("");
const endTime = ref("");
const errorMessage = ref("");
const midnight = timeMap.indexOf(0);


function calculatePay() {

    errorMessage.value = ""

    let bedTimePresent = bedTime.value == "";
    let bedHour = 0;
    let bedMinute = 0;

    let startHour = timeMap.indexOf(+startTime.value.split(":")[0])
    let startMinute = +startTime.value.split(":")[1]

    let endHour = timeMap.indexOf(+endTime.value.split(":")[0])
    let endMinute = +endTime.value.split(":")[1]

    if(startHour === -1)
    {
        errorMessage.value += "Start time must be after 5:00 p.m.\n";
        return
    }

    if(endHour === -1 || (endHour === (timeMap.length-1) && endMinute > 0))
    {
        errorMessage.value += "End time must be before 4:00 a.m.\n";
        return
    }

    if(bedTimePresent)
    {
        bedHour = timeMap.indexOf(+bedTime.value.split(":")[0])
        bedMinute = +bedTime.value.split(":")[1]

        if(bedHour < startHour || bedHour > endHour || bedHour === -1)
        {
            errorMessage.value += "Bed time must be between start time and end time.\n";
            return;
        }

        if(endMinute - bedMinute < 0)
        {
            bedHour++;
        }

        if(startMinute - bedMinute > 0)
        {
            startHour++;
        }

        pay.value = ((bedHour-startHour) * startBedPay) + ((midnight - bedHour) * bedMidnightPay) + ((endHour - midnight) * midnightEndPay)
    }
    else
    {
        if(endMinute - startMinute < 0)
        {
            startHour++;
        }

        pay.value = ((midnight-startHour) * startBedPay) + ((endHour - midnight) * midnightEndPay)
    }

}
</script>

<template>
  <main>
    <form onsubmit="return false">
        <h id="errorMessage">{{ errorMessage }}</h>
        <br>
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
    #errorMessage {
        color: red;
    }
</style>