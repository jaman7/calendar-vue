<script setup lang="ts">
defineProps<{
  modelValue: number | null;
  min?: number;
  max?: number;
}>();
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <input
    type="number"
    :value="modelValue ?? ''"
    @input="$emit('update:modelValue', ($event?.target as HTMLInputElement)?.valueAsNumber)"
    class="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    :min="min"
    :max="max"
    placeholder="Enter value"
  />
</template>
