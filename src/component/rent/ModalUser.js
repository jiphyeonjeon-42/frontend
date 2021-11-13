import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import AdminSearchBar from "../utils/AdminSearchBar";
import { useModalSearchInput } from "../../atom/useSearchInput";
import AdminPagination from "../utils/AdminPagination";
import UserList from "./UserList";
import "../../css/ModalUser.css";

// eslint-disable-next-line react/prop-types
const ModalUser = ({ setSelectUser, setUserModal }) => {
  const [userSearchWord, setUserSearchWord] =
    useRecoilState(useModalSearchInput);
  const [userSearchPage, setUserSearchPage] = useState(1);
  const [userSearchPageRange, setUserSearchPageRange] = useState(0);
  const [lastUserSearchPage, setLastUserSearchPage] = useState(1);
  const [userList, setUserList] = useState([]);

  const handleUserSearchSumbit = event => {
    event.preventDefault();
    const searchForm = document.querySelector(".modal-search-form");
    const searchInputValue = searchForm.querySelector(
      ".modal-search__input",
    ).value;
    setUserSearchWord(searchInputValue);
    setUserSearchPage(1);
    setUserSearchPageRange(0);
  };

  const fetchUserData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/search`, {
        params: {
          query: userSearchWord,
          page: userSearchPage,
          limit: 5,
        },
      })
      .then(res => {
        setUserList(res.data.items);
        setLastUserSearchPage(
          res.data.meta.totalPages > 0 ? res.data.meta.totalPages : 1,
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(fetchUserData, [userSearchWord, userSearchPage]);

  useEffect(() => {
    setUserSearchPageRange(0);
    setUserSearchPage(1);
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
    <section className="modal-user">
      <div className="modal-user__search-bar">
        <div className="modal-user__text font-28-bold color-54">카뎃 정보</div>
        <AdminSearchBar
          width="long"
          placeHolder="대출자의 성명을 입력해주세요."
        />
      </div>
      {userList.map(user => (
        <UserList
          key={user.id}
          user={user}
          setSelectUser={setSelectUser}
          setUserModal={setUserModal}
          name={`Name${user.id}`}
          lendCnt={user.id % 3}
          isPenalty={user.id % 2 ? !user.isPenalty : user.isPenalty}
        />
      ))}
      <div className="modal-user__pagination">
        <AdminPagination
          userPage={userSearchPage}
          setUserPage={setUserSearchPage}
          pageRange={userSearchPageRange}
          setPageRange={setUserSearchPageRange}
          lastPage={lastUserSearchPage}
        />
      </div>
    </section>
  );
};

export default ModalUser;
