import { describe, expect, it } from 'vitest';
import { createDictFromListArray } from '../dictionaries';

describe('createDictFromListArray', () => {
  it('returns empty array if input is undefined', () => {
    // @ts-expect-error: intentionally wrong type
    const result = createDictFromListArray(undefined);
    expect(result).toEqual([]);
  });

  it('returns empty array if input is null', () => {
    // @ts-expect-error: intentionally wrong type
    const result = createDictFromListArray(null);
    expect(result).toEqual([]);
  });

  it('returns empty array if input is not an array', () => {
    // @ts-expect-error: intentionally wrong type
    const result = createDictFromListArray(123);
    expect(result).toEqual([]);
  });

  it('converts list of strings to dictionary format', () => {
    const input = ['one', 'two', 'three'];
    const result = createDictFromListArray(input);
    expect(result).toEqual([
      { id: 'one', displayName: 'one' },
      { id: 'two', displayName: 'two' },
      { id: 'three', displayName: 'three' },
    ]);
  });

  it('handles empty array correctly', () => {
    const result = createDictFromListArray([]);
    expect(result).toEqual([]);
  });
});
