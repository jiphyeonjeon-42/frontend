export const isNull = x => x === null;
export const isUndefined = x => x === undefined;
export const isString = x => typeof x === "string";
export const isNumber = x => typeof x === "number";
export const isNaN = x => Number.isNaN(x);
export const isBool = x => typeof x === "number" && (x === 1 || x === 0);
export const isEmptyString = x => typeof x === "string" && x.length === 0;
export const isValidString = x => typeof x === "string" && x.length > 0;

const typeChecker = [
  { type: "string", checker: isString },
  { type: "number", checker: isNumber },
  { type: "bool", checker: isBool },
];

export const compareExpect = (url, responseItems, expectedItem) => {
  const items = [];
  responseItems.forEach(item => {
    const refinedData = {};
    expectedItem.forEach(expect => {
      const value = item[expect.key];
      if (expect.type === "*") {
        refinedData[expect.key] = value;
      } else if (typeof expect.type === "object") {
        const object = compareExpect(url, value, expect.type);
        refinedData[expect.key] = object;
      } else {
        const { checker } = typeChecker.find(i => i.type === expect.type);
        if (
          isUndefined(value) ||
          (!expect.isNullable && isNull(value)) ||
          (expect.isNullable && !isNull(value) && !checker(value))
        )
          throw Error(`type error ${url} ${expect.key} ${value}`);
        refinedData[expect.key] = value;
      }
    });
    items.push(refinedData);
  });
  return items;
};

export const replaceNull = (x, typeString) => {
  if (typeString === "number" && isNumber(x) && !isNaN(x)) return x;
  if (typeString === "string" && isString(x) && !isEmptyString(x)) return x;
  return null;
};
