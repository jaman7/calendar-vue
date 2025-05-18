import { mount } from '@vue/test-utils';
import CustomRangePicker from '../CustomRangePicker.vue';

describe('CustomRangePicker - extended tests', () => {
  it('emits correct JSON for last-7-days shortcut', async () => {
    const wrapper = mount(CustomRangePicker, {
      props: {
        selectOptions: ['last-7-days'],
      },
    });

    await wrapper.find('select').setValue('last-7-days');
    const emitted = wrapper.emitted()['update:modelValue']?.at(-1)?.[0];

    expect(emitted.mode).toBe('last-7-days');
    expect(emitted.from).toBeDefined();
    expect(emitted.to).toBeDefined();
    expect(new Date(emitted.from) <= new Date(emitted.to)).toBeTruthy();
  });

  it('emits correct JSON for this-month shortcut', async () => {
    const wrapper = mount(CustomRangePicker, {
      props: {
        selectOptions: ['this-month'],
      },
    });

    await wrapper.find('select').setValue('this-month');
    const emitted = wrapper.emitted()['update:modelValue']?.at(-1)?.[0];

    expect(emitted.mode).toBe('this-month');
    expect(emitted.from).toMatch(/\d{4}-\d{2}-01/);
    expect(emitted.to).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  it('resets from/to when changing from shortcut to input mode', async () => {
    const wrapper = mount(CustomRangePicker, {
      props: {
        selectOptions: ['this-month', 'minute'],
        minValue: 1,
        maxValue: 300,
      },
    });

    await wrapper.find('select').setValue('this-month');
    const emitted1 = wrapper.emitted()['update:modelValue']?.at(-1)?.[0];
    expect(emitted1.from).toBeTruthy();

    await wrapper.find('select').setValue('minute');
    const emitted2 = wrapper.emitted()['update:modelValue']?.at(-1)?.[0];
    expect(emitted2.from).toBeUndefined();
    expect(emitted2.to).toBeUndefined();
  });
});
