export const managementTabList = [
  { name: "유저관리", link: "/user" },
  { name: "도서등록", link: "/addbook" },
];

export const rentTabList = [
  { name: "대출", link: "/rent" },
  { name: "예약대출", link: "/reservation" },
  { name: "반납", link: "/return" },
];

export const myPageTabList = [
  { name: "대출정보", sort: "myRent" },
  { name: "예약정보", sort: "myReservation" },
  { name: "내가 쓴 리뷰", sort: "myReview" },
];

export const reviewTabList = [
  { name: "리뷰", sort: "showReviews" },
  { name: "리뷰하기", sort: "doReview" },
];
