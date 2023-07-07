import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { install } from "ga-gtag";
import BookDetail from "./component/book/BookDetail";
import Footer from "./component/utils/Footer";
import NotFound from "./component/utils/NotFound";
import Header from "./component/utils/Header";
import MobileHeader from "./component/utils/MobileHeader";
import Information from "./component/information/Information";
import Main from "./component/main/Main";
import Search from "./component/search/Search";
import Auth from "./component/login/Auth";
import Logout from "./component/login/Logout";
import Login from "./component/login/Login";
import Register from "./component/login/Register";
import Rent from "./component/rent/Rent";
import History from "./component/history/History";
import ReservedLoan from "./component/reservedloan/ReservedLoan";
import ReturnBook from "./component/return/ReturnBook";
import UserManagement from "./component/userManagement/UserManagement";
import AddBook from "./component/addbook/AddBook";
import MyPageRoutes from "./component/mypage/MyPageRoutes";
import userState from "./atom/userState";
import Mypage from "./component/mypage/Mypage";
import EditEmailOrPassword from "./component/mypage/EditEmailOrPassword";
import LimitedRoute from "./LimitedRoute";
import { isExpiredDate } from "./util/date";
import BookManagement from "./component/bookManagement/BookManagement";
import ReviewManagement from "./component/reviewManagement/ReviewManagement";
import BookStock from "./component/bookStock/BookStock";
import ELibraryIn42Box from "./component/eLibraryIn42Box/EventPage";
import SuperTagManagement from "./component/superTag/SuperTagManagement";
import SubTagManagement from "./component/subTag/SubTagManagement";
import Portals from "./component/utils/Portals";
import "./asset/css/reset.css";

function App() {
  const setUser = useSetRecoilState(userState);
  useEffect(() => {
    install(import.meta.env.REACT_APP_GA_ID);
    const localUser = JSON.parse(window.localStorage.getItem("user"));

    if (localUser?.isLogin) {
      if (!isExpiredDate(localUser?.expire)) setUser(localUser);
      else window.localStorage.removeItem("user");
    }
  }, []);

  return (
    <BrowserRouter>
      <div id="portal" />
      <Portals />
      <Header />
      <MobileHeader />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/41" element={<ELibraryIn42Box />} />
        <Route path="/information" element={<Information />} />
        <Route path="/search" element={<Search />} />
        <Route path="/info/:id" element={<BookDetail />} />
        <Route element={<LimitedRoute isLogoutOnly />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<LimitedRoute isAdminOnly />}>
          <Route path="/rent" element={<Rent />} />
          <Route path="/return" element={<ReturnBook />} />
          <Route path="/reservation" element={<ReservedLoan />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/user" element={<UserManagement />} />
          <Route path="/history" element={<History />} />
          <Route path="/book" element={<BookManagement />} />
          <Route path="/review" element={<ReviewManagement />} />
          <Route path="/stock" element={<BookStock />} />
          <Route path="/tag/super" element={<SuperTagManagement />} />
          <Route path="/tag/sub" element={<SubTagManagement />} />
        </Route>
        <Route element={<LimitedRoute isLoginOnly />}>
          <Route path="/mypage" element={<MyPageRoutes />}>
            <Route index element={<Mypage />} />
            <Route path="edit/:mode" element={<EditEmailOrPassword />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
