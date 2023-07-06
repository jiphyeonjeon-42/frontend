import Pagination from "../../utils/Pagination";
import { useGetHistories } from "../../../api/histories/useGetHistories";
import RentHistoryTable from "./RentHistoryTable";
import "../../../asset/css/RentHistory.css";
import { useDialog } from "../../../hook/useDialog";

const RentHistory = () => {
  const { Dialog, setOpenTitleAndMessage } = useDialog();
  const { historiesList, lastPage, page, setPage } = useGetHistories({
    initWho: "my",
    setOpenTitleAndMessage,
  });

  return (
    <div>
      {historiesList.map(factor => (
        <RentHistoryTable key={factor.id} factor={factor} />
      ))}
      <div className="rent_histories-table__pagination">
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      </div>
    </div>
  );
};

export default RentHistory;
