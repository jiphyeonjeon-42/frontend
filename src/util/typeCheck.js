export const isNull = x => x === null;
export const isUndefined = x => x === undefined;
export const isString = x => typeof x === "string";
export const isNumber = x => typeof x === "number";

const typeChecker = [
  { type: "string", checker: isString },
  { type: "number", checker: isNumber },
];

export const compareExpect = (url, responseItems, expectedItem) => {
  const items = [];
  responseItems.forEach(item => {
    const bookData = {};
    expectedItem.forEach(expect => {
      const value = item[expect.key];
      const { checker } = typeChecker.find(i => i.type === expect.type);
      if (
        isUndefined(value) ||
        (!expect.isNullable && isNull(value)) ||
        !checker(value)
      )
        throw Error(`type error url ${expect.key} ${value}`);
      bookData[expect.key] = value;
    });
    items.push(bookData);
  });
  return items;
};
