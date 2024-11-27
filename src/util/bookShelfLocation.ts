/**
 * 현재 책의 청구기호 첫 글자를 받아 현재 책이 위치한 선반 번호를 반환하는 함수 findBookShelfIndex
 * 선반 별로 청구기호 목록이 일정하지 않기 때문에 callSignAtShelf 배열을 생성
 * 4번째 선반은 b부터 z까지의 소문자로만 이루어져 있기 때문에 lowerCaseRange 배열을 추가 생성
 * findBookShelfIndex 함수는 callSignAtShelf 배열을 순회하며 청구기호의 첫 글자가 포함되어 있는 선반 번호를 반환
 * BookLocation 컴포넌트에서 청구기호의 첫 글자를 받아 선반 번호를 계산하고 BookLocationMap 컴포넌트에 전달하여 해당 책의 선반은 하이라이트 표시
 *
 * @param callSignFirstChar - 현재 책의 청구기호 첫 글자
 * @example const bookShelfIndex = findBookShelfIndex("A");
 * @returns {number} - 현재 책이 위치한 선반 번호
 */

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

export const findBookShelfIndex = (callSignFirstChar: string) => {
  const shelfIndex = callSignAtShelf.findIndex(shelf =>
    shelf.includes(callSignFirstChar),
  );
  return shelfIndex;
};
