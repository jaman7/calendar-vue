<script setup lang="ts">
import { ref } from 'vue';
import CustomRangePicker from './components/CustomRangePicker.vue';

const selectedData = ref({});

const allowedOptions = [
  'last-7-days',
  'this-month',
  'year',
  'quarter',
  'month',
  'week',
  'day',
  'hour',
  'minute',
  'date-from',
  'date-to',
  'date-from-to',
];
</script>

<template>
  <div class="min-h-screen p-10 bg-gray-50">
    <h1 class="text-xl font-bold mb-4">Customisable Calendar Component</h1>

    <CustomRangePicker
      :select-options="allowedOptions"
      :min-date="'2022-01-01'"
      :max-date="'2025-12-31'"
      :min-value="1"
      :max-value="1000"
      v-model="selectedData"
    />

    <div class="mt-6 p-4 bg-white rounded-lg shadow">
      <h2 class="font-semibold mb-2">Output JSON:</h2>
      <pre class="text-sm bg-gray-100 p-2 rounded-lg shadow">{{ selectedData }}</pre>
    </div>
  </div>
</template>
