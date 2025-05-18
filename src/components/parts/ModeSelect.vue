<script setup lang="ts">
defineProps<{
  modelValue: string;
  options: string[];
}>();
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <select
    :value="modelValue"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement)?.value)"
    class="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Select mode</option>
    <option v-for="opt in options" :key="opt" :value="opt">
      {{ opt }}
    </option>
  </select>
</template>
