<script setup lang="ts">
import { format } from 'date-fns';
import { computed, ref, watch } from 'vue';
import DatePicker from './parts/DatePicker.vue';
import ModeSelect from './parts/ModeSelect.vue';
import ValueInput from './parts/ValueInput.vue';

interface Props {
  selectOptions: string[];
  minDate?: string;
  maxDate?: string;
  minValue?: number;
  maxValue?: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const errorMessage = ref('');
const mode = ref('');
const value = ref<number | null>(null);
const from = ref('');
const to = ref('');

const formatDate = (d: Date) => format(d, 'yyyy-MM-dd');

const applyShortcut = (modeVal: string) => {
  const d = new Date();
  if (modeVal === 'last-7-days') {
    const fromDate = new Date(d);
    fromDate.setDate(d.getDate() - 6);
    from.value = formatDate(fromDate);
    to.value = formatDate(d);
  }
  if (modeVal === 'this-month') {
    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    from.value = formatDate(start);
    to.value = formatDate(end);
  }
};

const showInput = computed(() =>
  ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute'].includes(mode.value)
);
const showFrom = computed(() =>
  ['date-from', 'date-from-to', 'last-7-days', 'this-month'].includes(mode.value)
);
const showTo = computed(() =>
  ['date-to', 'date-from-to', 'last-7-days', 'this-month'].includes(mode.value)
);

watch(mode, (newMode) => {
  if (['last-7-days', 'this-month'].includes(newMode)) {
    applyShortcut(newMode);
  } else {
    from.value = '';
    to.value = '';
  }
});

watch([mode, value, from, to], () => {
  errorMessage.value = '';

  if (showFrom.value && showTo.value && from.value && to.value) {
    if (new Date(from.value) > new Date(to.value)) {
      errorMessage.value = 'Date From cannot be later than Date To';
    }
  }

  emit('update:modelValue', {
    mode: mode.value,
    ...(showInput.value ? { value: value.value } : {}),
    ...(showFrom.value ? { from: from.value } : {}),
    ...(showTo.value ? { to: to.value } : {}),
    error: errorMessage.value || undefined,
  });
});
</script>

<template>
  <div class="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
    <div>
      <label class="text-sm text-gray-600 mb-1 block">Select time mode</label>
      <ModeSelect v-model="mode" :options="props.selectOptions" />
    </div>

    <div v-if="showInput">
      <label class="text-sm text-gray-600 mb-1 block">Enter value</label>
      <ValueInput v-model="value" :min="props.minValue" :max="props.maxValue" />
    </div>

    <div v-if="showFrom">
      <label class="text-sm text-gray-600 mb-1 block">From</label>
      <DatePicker v-model="from" :min="props.minDate" :max="props.maxDate" />
    </div>

    <div v-if="showTo">
      <label class="text-sm text-gray-600 mb-1 block">To</label>
      <DatePicker v-model="to" :min="props.minDate" :max="props.maxDate" />
    </div>

    <p v-if="errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
input,
select {
  @apply border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500;
}
</style>
