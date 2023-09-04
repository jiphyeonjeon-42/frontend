import MainRecommendTitle from "~/component/main/MainRecommendTitle";
import MainRecommendList from "~/component/main/MainRecommendList";
import "~/asset/css/MainRecommend.css";
import { useGetCursusRecommendBooks } from "~/api/cursus/useGetCursusRecommendBooks";
import Loader from "../utils/Loader";

const MainRecommend = () => {
  const { books, options, setSelectedOption, isLoading } =
    useGetCursusRecommendBooks();
  return (
    <section className="main__recommend__wrapper">
      <MainRecommendTitle
        isLoading={isLoading}
        options={options}
        setSelectedOption={setSelectedOption}
        description="과제를 진행하는 데 도움이 되는 추천 도서 목록입니다."
      />
      {isLoading ? (
        <div className="main__recommend__loader">
          <Loader />
        </div>
      ) : (
        <MainRecommendList books={books} isLoading={isLoading} />
      )}
    </section>
  );
};

export default MainRecommend;
