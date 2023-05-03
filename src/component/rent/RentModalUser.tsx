import RentUserList from "./RentModalUserList";
import SearchModal from "../utils/SearchModal";
import useGetUsersSearch from "../../api/users/useGetUsersSearch";

type Props = {
  setSelectedUser(...args: unknown[]): unknown;
  closeModal(...args: unknown[]): unknown;
};

const RentModalUser = ({ setSelectedUser, closeModal }: Props) => {
  const { userList, lastPage, page, setPage, setQuery, Dialog } =
    useGetUsersSearch({ limit: 5 });

  return (
    <SearchModal
      titleText="카뎃 정보"
      searchBarPlaceholder="대출자의 성명을 입력해주세요."
      page={page}
      setPage={setPage}
      setQuery={setQuery}
      lastPage={lastPage}
    >
      <Dialog />
      {userList.map(user => (
        <RentUserList
          key={user.id}
          user={user}
          setSelectedUser={setSelectedUser}
          closeModal={closeModal}
        />
      ))}
    </SearchModal>
  );
};

export default RentModalUser;
