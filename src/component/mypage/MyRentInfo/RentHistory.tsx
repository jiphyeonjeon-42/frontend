import Pagination from "~/component/utils/Pagination";
import { useGetHistories } from "~/api/histories/useGetHistories";
import RentHistoryTable from "./RentHistoryTable";
import "~/asset/css/RentHistory.css";

type Props = {
  userRole: number;
};

const RentHistory = ({ userRole }: Props) => {
  if (userRole === 0) return null;

  const { historiesList, lastPage, page, setPage } = useGetHistories({
    initWho: "my",
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
