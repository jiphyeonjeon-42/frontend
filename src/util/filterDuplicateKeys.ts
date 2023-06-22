export const filterDuplicateKeys = <T extends { key: any }>(arr: Array<T>) => {
  return [...new Map(arr.map(item => [item.key, item])).values()];
};
