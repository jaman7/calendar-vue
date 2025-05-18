import type { IDictType } from '../types/dictionaryTypes';

export const createDictFromListArray = (listNames: string[]): IDictType[] => {
  if (!Array.isArray(listNames)) return [];
  return listNames?.map((key, i) => ({ id: i + 1, displayName: key })) ?? [];
};
