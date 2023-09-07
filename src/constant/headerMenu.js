import Information from "../asset/img/information_icon.svg";
import InformationMobile from "../asset/img/information_icon_black.svg";
import Book from "../asset/img/admin_icon.svg";
import User from "../asset/img/Uniconlabs.png";
import UserMobile from "../asset/img/login_feen.png";
import Rent from "../asset/img/admin_icon_black.svg";
import DB from "../asset/img/database.svg";
import Mypage from "../asset/img/login_icon.svg";
import Logout from "../asset/img/logout_IconsBox.png";

export const basicGnbMenu = [
  {
    img: Information,
    mobileImg: InformationMobile,
    imgAlt: "information",
    linkTo: "/information",
    text: "이용안내",
    isForMobile: true,
  },
  {
    img: Book,
    mobileImg: undefined,
    imgAlt: "bookList",
    linkTo: "/search",
    text: "도서목록",
    isForMobile: false,
  },
  {
    img: User,
    mobileImg: UserMobile,
    imgAlt: "login",
    linkTo: "/login",
    text: "로그인",
    isForMobile: true,
  },
];

export const loginLnbMenu = [
  {
    mobileImg: Mypage,
    imgAlt: "mypage",
    linkTo: "/mypage",
    text: "마이페이지",
  },
  {
    mobileImg: Logout,
    imgAlt: "logout",
    linkTo: "/logout",
    text: "로그아웃",
  },
];

export const adminLnbMenu = [
  {
    mobileImg: Rent,
    imgAlt: "rent",
    linkTo: "/rent",
    text: "대출/반납",
    idClassName: "book",
  },
  {
    mobileImg: DB,
    imgAlt: "user",
    linkTo: "/user",
    text: "유저관리",
    idClassName: "db",
  },
  {
    mobileImg: DB,
    imgAlt: "book",
    linkTo: "/book",
    text: "도서관리",
    idClassName: "db",
  },
  {
    mobileImg: DB,
    imgAlt: "other_db",
    linkTo: "/review",
    text: "추가기능관리",
    idClassName: "db",
  },
];
