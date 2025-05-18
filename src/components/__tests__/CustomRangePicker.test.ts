import { createDictFromListArray } from '@/shared/utils/dictionaries';
import { mount } from '@vue/test-utils';
import CustomRangePicker from '../CustomRangePicker.vue';

describe('CustomRangePicker', () => {
  const timeModes = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute'];
  const dateModes = ['date-from', 'date-to', 'date-from-to'];
  const minDate = '2022-01-01';
  const maxDate = '2025-12-31';
  const minValue = 1;
  const maxValue = 999;

  timeModes.forEach((mode) => {
    it(`emits correct JSON for time unit mode: ${mode}`, async () => {
      const wrapper = mount(CustomRangePicker, {
        props: {
          allowedOptionsDict: createDictFromListArray([mode]),
          minValue,
          maxValue,
        },
      });

      await wrapper.find('select').setValue(mode);
      const input = wrapper.find('input[type="number"]');
      await input.setValue(123);

      const emitted = wrapper.emitted()['update:modelValue']?.at(-1)?.[0];
      expect(emitted).toEqual({ mode, value: 123 });
    });
  });

  it('emits correct JSON for date-from mode', async () => {
    const wrapper = mount(CustomRangePicker, {
      props: {
        allowedOptionsDict: createDictFromListArray(['date-from']),
        minDate,
        maxDate,
      },
    });

    await wrapper.find('select').setValue('date-from');
    const input = wrapper.find('input[type="date"]');
    await input.setValue('2023-05-01');

    const emitted = wrapper.emitted()['update:modelValue']?.at(-1)?.[0];
    expect(emitted).toEqual({ mode: 'date-from', from: '2023-05-01' });
  });

  it('emits correct JSON for date-to mode', async () => {
    const wrapper = mount(CustomRangePicker, {
      props: {
        allowedOptionsDict: createDictFromListArray(['date-to']),
        minDate,
        maxDate,
      },
    });

    await wrapper.find('select').setValue('date-to');
    const input = wrapper.find('input[type="date"]');
    await input.setValue('2023-05-31');

    const emitted = wrapper.emitted()['update:modelValue']?.at(-1)?.[0];
    expect(emitted).toEqual({ mode: 'date-to', to: '2023-05-31' });
  });

  it('emits correct JSON for date-from-to mode', async () => {
    const wrapper = mount(CustomRangePicker, {
      props: {
        allowedOptionsDict: createDictFromListArray(['date-from-to']),
        minDate,
        maxDate,
      },
    });

    await wrapper.find('select').setValue('date-from-to');
    const inputs = wrapper.findAll('input[type="date"]');
    await inputs[0].setValue('2023-06-01');
    await inputs[1].setValue('2023-06-10');

    const emitted = wrapper.emitted()['update:modelValue']?.at(-1)?.[0];
    expect(emitted).toEqual({
      mode: 'date-from-to',
      from: '2023-06-01',
      to: '2023-06-10',
    });
  });

  it('shows error when "from" > "to" in date-from-to mode', async () => {
    const wrapper = mount(CustomRangePicker, {
      props: {
        allowedOptionsDict: createDictFromListArray(['date-from-to']),
      },
    });

    await wrapper.find('select').setValue('date-from-to');
    const inputs = wrapper.findAll('input[type="date"]');
    await inputs[0].setValue('2023-07-10');
    await inputs[1].setValue('2023-07-01');

    const emitted = wrapper.emitted()['update:modelValue']?.at(-1)?.[0];
    expect(emitted.error).toBe('Date From cannot be later than Date To');
  });
});
