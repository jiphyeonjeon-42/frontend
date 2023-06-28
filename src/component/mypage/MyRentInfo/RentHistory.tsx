import Pagination from "../../utils/Pagination";
import { useGetHistories } from "../../../api/histories/useGetHistories";
import RentHistoryTable from "./RentHistoryTable";
import "../../../asset/css/RentHistory.css";

const RentHistory = () => {
  const { historiesList, lastPage, page, setPage } = useGetHistories();

  return (
    <div>
      {historiesList.map(history => (
        <RentHistoryTable key={history.id} history={history} />
      ))}
      <div className="rent_histories-table__pagination">
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      </div>
    </div>
  );
};

export default RentHistory;
