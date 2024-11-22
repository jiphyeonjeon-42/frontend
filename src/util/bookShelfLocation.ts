export const findBookShelfLocation = (callSignFirstChar: string) => {
  const lowerCaseRange = Array.from(
    { length: "z".charCodeAt(0) - "b".charCodeAt(0) + 1 },
    (_, i) => String.fromCharCode("b".charCodeAt(0) + i),
  );
  const callSignAtShelf = [
    ["A", "D", "F", "I"],
    ["B", "E", "G", "N", "J"],
    ["K", "H", "O"],
    lowerCaseRange,
    ["C", "L", "M", "a"],
  ];
  const shelf = callSignAtShelf.findIndex(shelf =>
    shelf.includes(callSignFirstChar),
  );
  return shelf;
};
