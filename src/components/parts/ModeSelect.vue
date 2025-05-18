<script setup lang="ts">
import type { IDictType } from '@/shared/types/dictionaryTypes';

defineProps<{
  modelValue: string;
  dict: IDictType[];
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
    <option v-for="opt in dict" :key="opt.id" :value="opt.displayName">
      {{ opt.displayName }}
    </option>
  </select>
</template>
