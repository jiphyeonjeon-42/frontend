import React, { useState } from "react";
import Banner from "../utils/Banner";
import Tabs from "../utils/Tabs";
import UserBriefInfo from "./UserBriefInfo";
import UserUsageInfo from "./UserUsageInfo";
import SearchBar from "../utils/SearchBar";
import Pagination from "../utils/Pagination";
import Modal from "../utils/Modal";
import ModalHeader from "../utils/ModalHeader";
import UserDetailInfo from "./UserDetailInfo";

import { userManagementTabList } from "../../data/tablist";
import useGetUsersSearch from "../../api/users/useGetUsersSearch";
import "../../css/UserManagement.css";

const USAGE = 1;

const UserManagement = () => {
  const [modal, setModal] = useState(0);
  const [selectedUser, setSelectedUser] = useState(0);
  const { userList, lastPage, setQuery, page, setPage, Dialog } =
    useGetUsersSearch({ limit: 10 });

  const closeModal = () => setModal(0);

  return (
    <main>
      <Banner img="admin" titleKo="유저 관리" titleEn="USER MANAGEMENT" />
      <Tabs tabList={userManagementTabList} />
      <section className="user-management-body">
        <div className="user-management-search">
          <SearchBar
            width="center"
            placeHolder="nickname 또는 email을 입력해주세요."
            setQuery={setQuery}
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
            <Pagination page={page} setPage={setPage} lastPage={lastPage} />
          </div>
        </div>
      </section>
      {modal ? (
        <Modal isOpen={modal} onCloseModal={closeModal} size="full">
          <ModalHeader onCloseModal={closeModal} isWithCloseButton />
          {modal === USAGE ? (
            <UserUsageInfo key={selectedUser.id} user={selectedUser} />
          ) : (
            <UserDetailInfo user={selectedUser} closeModal={closeModal} />
          )}
        </Modal>
      ) : null}
      <Dialog />
    </main>
  );
};

export default UserManagement;
