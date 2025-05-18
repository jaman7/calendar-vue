import type { IDictType } from '../types/dictionaryTypes';

export const createDictFromListArray = (listNames: string[]): IDictType[] => {
  if (!Array.isArray(listNames)) return [];
  return listNames?.map((key) => ({ id: key, displayName: key })) ?? [];
};
