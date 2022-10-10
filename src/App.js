import React, { useEffect } from "react";
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
import ReservedLoan from "./component/reservedloan/ReservedLoan";
import ReturnBook from "./component/return/ReturnBook";
import UserManagement from "./component/userManagement/UserManagement";
import AddBook from "./component/book/AddBook";
import MyPageRoutes from "./component/mypage/MyPageRoutes";
import userState from "./atom/userState";
import Mypage from "./component/mypage/Mypage";
import EditEmail from "./component/mypage/EditEmail";
import EditPassword from "./component/mypage/EditPassword";
import "./css/reset.css";
import LimitedRoute from "./LimitedRoute";

function App() {
  const setUser = useSetRecoilState(userState);
  useEffect(() => {
    install(process.env.REACT_APP_GA_ID);
    const localUser = JSON.parse(window.localStorage.getItem("user"));

    const nowDate = new Date();
    if (localUser && localUser.isLogin) {
      const expireDate = new Date(localUser.expire);
      if (nowDate < expireDate) setUser(localUser);
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <MobileHeader />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/information" element={<Information />} />
        <Route path="/search" element={<Search />} />
        <Route path="/info/:id" element={<BookDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route element={<LimitedRoute isAdminOnly />}>
          <Route path="/rent" element={<Rent />} />
          <Route path="/return" element={<ReturnBook />} />
          <Route path="/reservation" element={<ReservedLoan />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/user" element={<UserManagement />} />
        </Route>
        <Route element={<LimitedRoute isLoginOnly />}>
          <Route path="/mypage" element={<MyPageRoutes />}>
            <Route index element={<Mypage />} />
            <Route path="edit/email" element={<EditEmail />} />
            <Route path="edit/pw" element={<EditPassword />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
