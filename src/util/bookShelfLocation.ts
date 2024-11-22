// 소문자로만 이루어진 청구기호 범위를 생성
const lowerCaseRange = Array.from(
  { length: "z".charCodeAt(0) - "b".charCodeAt(0) + 1 },
  (_, i) => String.fromCharCode("b".charCodeAt(0) + i),
);

// 선반 별 청구기호 목록
const callSignAtShelf = [
  ["A", "D", "F", "I"],
  ["B", "E", "G", "N", "J"],
  ["K", "H", "O"],
  lowerCaseRange,
  ["C", "L", "M", "a"],
];

// 선반 별 청구기호 목록을 반환하는 함수
export const findBookShelfCallSigns = (shelfIndex: number) => {
  return callSignAtShelf[shelfIndex];
};

// 청구기호의 첫 글자를 받아 선반 번호를 반환하는 함수
export const findBookShelfIndex = (callSignFirstChar: string) => {
  const shelfIndex = callSignAtShelf.findIndex(shelf =>
    shelf.includes(callSignFirstChar),
  );
  return shelfIndex;
};
