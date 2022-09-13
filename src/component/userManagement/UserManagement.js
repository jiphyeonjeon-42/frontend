import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Banner from "../utils/Banner";
import "../../css/UserManagement.css";
import Tabs from "../utils/Tabs";
import UserBriefInfo from "./UserBriefInfo";
import UserUsageInfo from "./UserUsageInfo";
import AdminSearchBar from "../utils/AdminSearchBar";
import AdminPagination from "../utils/AdminPagination";
import MidModal from "../utils/MidModal";
import MiniModal from "../utils/MiniModal";
import ModalContentsTitleWithMessage from "../utils/ModalContentsTitleWithMessage";
import getErrorMessage from "../../data/error";
import { useAdminSearchInput } from "../../atom/useSearchInput";
import UserDetailInfo from "./UserDetailInfo";

import { managementTabList } from "../../data/tablist";

const USAGE = 1;
// const EDIT = 2;

const UserManagement = () => {
  const [modal, setModal] = useState(0);
  const [miniModal, setMiniModal] = useState(0);
  const [selectedUser, setSelectedUser] = useState(0);
  const [userSearchWord, setUserSearchWord] =
    useRecoilState(useAdminSearchInput);
  const [userListPage, setUserListPage] = useState(1);
  const [userListPageRange, setUserListPageRange] = useState(0);
  const [lastUserListPage, setLastUserListPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [errorCode, setErrorCode] = useState(-1);
  const [isEdit, setIsEdit] = useState(false);

  const closeModal = () => {
    setModal(0);
  };

  const closeMiniModal = () => {
    setMiniModal(0);
  };

  const openMiniModal = () => {
    setMiniModal(1);
  };

  const handleUserSearchSumbit = event => {
    event.preventDefault();
    const searchForm = document.querySelector(".modal-search-form");
    const searchInputValue = searchForm.querySelector(
      ".modal-search__input",
    ).value;
    setUserSearchWord(searchInputValue);
    setUserListPage(1);
    setUserListPageRange(0);
  };

  const getUserList = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/search`, {
        params: {
          nicknameOrEmail: userSearchWord,
          page: userListPage - 1,
          limit: 10,
        },
      })
      .then(res => {
        setUserList(res.data.items);
        setLastUserListPage(
          res.data.meta.totalPages > 0 ? res.data.meta.totalPages : 1,
        );
      })
      .catch(error => {
        closeModal();
        setErrorCode(error.response.data.errorCode);
        openMiniModal();
      });
  };

  useEffect(getUserList, [userSearchWord, userListPage, isEdit]);

  useEffect(() => {
    setUserListPageRange(0);
    setUserListPage(1);
  }, [userSearchWord]);

  useEffect(() => {
    const searchForm = document.querySelector(".modal-search-form");
    searchForm.addEventListener("submit", handleUserSearchSumbit);
    return () =>
      searchForm.removeEventListener("submit", handleUserSearchSumbit);
  }, [handleUserSearchSumbit]);

  useEffect(() => {
    setUserSearchWord("");
  }, []);

  const tabList = [
    { name: "유저관리", link: "/user" },
    { name: "도서등록", link: "/addbook" },
  ];

  const [title, content] = getErrorMessage(parseInt(errorCode, 10)).split(
    "\r\n",
  );

  return (
    <main>
      <Banner img="admin" titleKo="유저 관리" titleEn="USER MANAGEMENT" />
      <Tabs tabList={tabList} />
      <section className="user-management-body">
        <div className="user-management-search">
          <AdminSearchBar
            width="center"
            placeHolder="nickname 또는 email을 입력해주세요."
          />
        </div>
        <div className="user-management-table__inquire-title">
          <div className="user-info">
            <div className="user-info__id font-18 color-ff">ID</div>
            <div className="user-info__nickname font-18 color-ff">NICKNAME</div>
            <div className="user-info__role font-18 color-ff">ROLE</div>
            <div className="user-info__email font-18 color-ff">EMAIL</div>
            <div className="user-info__overdue font-18 color-ff">연체현황</div>
            <div className="user-info__usage font-18 color-ff">이용현황</div>
            <div className="user-info__edit font-18 color-ff">수정</div>
          </div>
        </div>
        <div className="user-management-table__inquire-box">
          {userList.map((user, index) => (
            <UserBriefInfo
              key={user.id}
              user={user}
              line={index !== 0}
              setModal={setModal}
              setSelectedUser={setSelectedUser}
            />
          ))}
          <div className="user-management-table__pagination">
            <AdminPagination
              userPage={userListPage}
              setUserPage={setUserListPage}
              pageRange={userListPageRange}
              setPageRange={setUserListPageRange}
              lastPage={lastUserListPage}
            />
          </div>
        </div>
      </section>
      {modal && !miniModal ? (
        <MidModal closeModal={closeModal}>
          {modal === USAGE ? (
            <UserUsageInfo key={selectedUser.id} user={selectedUser} />
          ) : (
            <UserDetailInfo
              user={selectedUser}
              setErrorCode={setErrorCode}
              closeMidModal={closeModal}
              openMiniModal={openMiniModal}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          )}
        </MidModal>
      ) : (
        ``
      )}
      {miniModal && errorCode >= 0 ? (
        <MiniModal closeModal={closeMiniModal}>
          <ModalContentsTitleWithMessage
            closeModal={closeMiniModal}
            title={title}
            message={content}
          />
        </MiniModal>
      ) : (
        ``
      )}
    </main>
  );
};

export default UserManagement;
