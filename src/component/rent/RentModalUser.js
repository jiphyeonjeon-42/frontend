import React from "react";
import PropTypes from "prop-types";
import SearchBar from "../utils/SearchBar";
import Pagination from "../utils/Pagination";
import RentUserList from "./RentModalUserList";
import "../../css/RentModalUser.css";
import useGetUsersSearch from "../../api/users/useGetUsersSearch";

const RentModalUser = ({ setSelectedUser, closeModal }) => {
  const { userList, lastPage, page, setPage, setQuery, Dialog } =
    useGetUsersSearch();
  return (
    <div className="rent__modal-user">
      <div className="rent__modal-user__search-bar">
        <div className="rent__modal-user__text font-28-bold color-54">
          카뎃 정보
        </div>
        <Dialog />
        <SearchBar
          setQuery={setQuery}
          width="long"
          placeHolder="대출자의 성명을 입력해주세요."
        />
      </div>
      {userList.map(user => (
        <RentUserList
          key={user.id}
          user={user}
          setSelectedUser={setSelectedUser}
          closeModal={closeModal}
        />
      ))}
      <div className="rent__modal-user__pagination">
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      </div>
    </div>
  );
};

export default RentModalUser;

RentModalUser.propTypes = {
  setSelectedUser: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
