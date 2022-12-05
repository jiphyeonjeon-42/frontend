import React from "react";
import Pagination from "../../utils/Pagination";
import useGetHistories from "../../../api/histories/useGetHistories";
import RentHistoryTable from "./RentHistoryTable";

const RentHistory = () => {
  const { historiesList, lastPage, page, setPage } = useGetHistories({
    initWho: "my",
  });

  return (
    <div>
      {historiesList.map(factor => (
        <RentHistoryTable key={factor.id} factor={factor} />
      ))}
      <div className="histories-table__pagination">
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      </div>
    </div>
  );
};

export default RentHistory;
