export const managementTabList = [
  { name: "유저관리", link: "/user" },
  { name: "도서등록", link: "/addbook" },
  { name: "도서관리", link: "/book" },
];

export const rentTabList = [
  { name: "대출", link: "/rent" },
  { name: "예약대출", link: "/reservation" },
  { name: "반납", link: "/return" },
  { name: "전체기록", link: "/history" },
];

export const myPageTabList = [
  { name: "대출정보", type: "myRent" },
  { name: "예약정보", type: "myReservation" },
  { name: "내가 쓴 리뷰", type: "myReview" },
];

export const reviewTabList = [
  { name: "리뷰", type: "showReviews" },
  { name: "리뷰하기", type: "doReview" },
];
