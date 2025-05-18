<script setup lang="ts">
defineProps<{
  modelValue: string;
  min?: string;
  max?: string;
}>();
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <input
    type="date"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event?.target as HTMLInputElement)?.value)"
    class="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    :min="min"
    :max="max"
  />
</template>
