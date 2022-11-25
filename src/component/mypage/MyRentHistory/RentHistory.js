import React from "react";
import Pagination from "../../utils/Pagination";
import useGetHistories from "../../../api/histories/useGetHistories";
import RentHistoryTable from "./RentHistoryTable";

const History = () => {
  const { historiesList, lastPage, page, setPage } = useGetHistories({});

  return (
    <div className="histories-table__inquire-box">
      {historiesList.map(factor => (
        <RentHistoryTable key={factor.id} factor={factor} />
      ))}
      <div className="histories-table__pagination">
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      </div>
    </div>
  );
};

export default History;
