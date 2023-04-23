type TabType = { name: string; link?: string; type?: string };

export const userManagementTabList: TabType[] = [
  { name: "유저관리", link: "/user" },
];

export const bookManagementTabList: TabType[] = [
  { name: "도서등록", link: "/addbook" },
  { name: "도서관리", link: "/book" },
  { name: "재고관리", link: "/stock" },
];

export const otherManagementTabList: TabType[] = [
  { name: "리뷰관리", link: "/review" },
];

export const rentTabList: TabType[] = [
  { name: "대출", link: "/rent" },
  { name: "예약대출", link: "/reservation" },
  { name: "반납", link: "/return" },
  { name: "전체기록", link: "/history" },
];

export const myPageTabList: TabType[] = [
  { name: "대출정보", type: "myRent" },
  { name: "예약정보", type: "myReservation" },
  { name: "내가 쓴 리뷰", type: "myReview" },
];

export const reviewTabList: TabType[] = [
  { name: "리뷰", type: "showReviews" },
  { name: "리뷰하기", type: "doReview" },
];
