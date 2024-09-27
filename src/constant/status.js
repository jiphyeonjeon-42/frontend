export const bookStatus = [
  { code: 0, string: "대출 가능" },
  { code: 1, string: "분실" },
  { code: 2, string: "파손" },
  { code: 3, string: "지정 도서" },
];

export const userRoleStatus = [
  { code: 0, string: "미인증" },
  { code: 1, string: "카뎃" },
  { code: 2, string: "사서" },
  { code: 3, string: "기타 운영진" },
];

export const userRoleStatusEnum = {
  미인증: 0,
  카뎃: 1,
  사서: 2,
  기타_운영진: 3
};

/**
 * 유저의 role에 따른 대출권수를 반환하는 함수
 * @param {*} currentUser 현재 로그인한 유저 객체
 * @param {*} selectedUser 대출 진행 시 선택된 유저 객체
 * @returns 유저가 사서 or 기타 운영진이고 본인의 대출일 때 4, 그 외는 2
 */
export const lendingLimit = (currentUser, selectedUser) => {
  return (currentUser?.isAdmin && currentUser.id === selectedUser?.id ? 4 : 2);
}

export const reservationStatus = [
  { code: 0, string: "예약 중" },
  { code: 1, string: "대출 완료" },
  { code: 2, string: "예약 취소" },
  { code: 3, string: "예약 기한 만료" },
];
