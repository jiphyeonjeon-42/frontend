import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Banner from "../utils/Banner";
import "../../css/UserManagement.css";
import Tabs from "../utils/Tabs";
import UserBriefInfo from "./UserBriefInfo";
import UserUsageInfo from "./UserUsageInfo";
import AdminSearchBar from "../utils/AdminSearchBar";
import Pagination from "../utils/Pagination";
import MidModal from "../utils/MidModal";
import useDialog from "../../hook/useDialog";
import { useAdminSearchInput } from "../../atom/useSearchInput";
import UserDetailInfo from "./UserDetailInfo";

import getErrorMessage from "../../data/error";
import { managementTabList } from "../../data/tablist";

const USAGE = 1;
// const EDIT = 2;

const UserManagement = () => {
  const [modal, setModal] = useState(0);
  const [selectedUser, setSelectedUser] = useState(0);
  const [userSearchWord, setUserSearchWord] =
    useRecoilState(useAdminSearchInput);
  const [userListPage, setUserListPage] = useState(1);
  const [lastUserListPage, setLastUserListPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const {
    setOpen: openDialog,
    setTitleAndMessage: setDialogTitleAndMessage,
    Dialog,
  } = useDialog();

  const closeModal = () => {
    setModal(0);
  };

  const handleUserSearchSumbit = event => {
    event.preventDefault();
    const searchForm = document.querySelector(".modal-search-form");
    const searchInputValue = searchForm.querySelector(
      ".modal-search__input",
    ).value;
    setUserSearchWord(searchInputValue);
    setUserListPage(1);
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
        const errorCode = parseInt(error?.response?.data?.errorCode, 10);
        const [title, message] = getErrorMessage(errorCode).split("\r\n");
        setDialogTitleAndMessage(title, message);
        openDialog();
      });
  };

  useEffect(getUserList, [userSearchWord, userListPage, isEdit]);

  useEffect(() => {
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

  return (
    <main>
      <Banner img="admin" titleKo="유저 관리" titleEn="USER MANAGEMENT" />
      <Tabs tabList={managementTabList} />
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
            <Pagination
              page={userListPage}
              setPage={setUserListPage}
              lastPage={parseInt(lastUserListPage, 10)}
            />
          </div>
        </div>
      </section>
      {modal && (
        <MidModal closeModal={closeModal}>
          {modal === USAGE ? (
            <UserUsageInfo key={selectedUser.id} user={selectedUser} />
          ) : (
            <UserDetailInfo
              user={selectedUser}
              closeMidModal={closeModal}
              openDialog={openDialog}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              setDialogTitleAndMessage={setDialogTitleAndMessage}
            />
          )}
        </MidModal>
      )}
      <Dialog />
    </main>
  );
};

export default UserManagement;
