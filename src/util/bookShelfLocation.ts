const lowerCaseRange = Array.from(
  { length: "z".charCodeAt(0) - "b".charCodeAt(0) + 1 },
  (_, i) => String.fromCharCode("b".charCodeAt(0) + i),
);

/**
선반 별 청구기호 목록이 일정하지 않기 때문에 callSignAtShelf 배열을 생성
*/
export const callSignAtShelf = [
  ["A", "D", "F", "I"],
  ["B", "E", "G", "N", "J"],
  ["K", "H", "O"],
  lowerCaseRange,
  ["C", "L", "M", "a"],
];

/**
현재 책의 청구기호 첫 글자를 받아 현재 책이 위치한 선반 번호를 반환하는 함수
* @param callSignFirstChar - 현재 책의 청구기호 첫 글자
* @example const bookShelfIndex = findBookShelfIndex("A");
* @returns {number} - 현재 책이 위치한 선반 번호
*/

export const findBookShelfIndex = (callSignFirstChar: string) => {
  const shelfIndex = callSignAtShelf.findIndex(shelf =>
    shelf.includes(callSignFirstChar),
  );
  return shelfIndex;
};
