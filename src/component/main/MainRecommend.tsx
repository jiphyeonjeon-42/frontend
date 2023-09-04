import MainRecommendTitle from "~/component/main/MainRecommendTitle";
import MainRecommendList from "~/component/main/MainRecommendList";
import "~/asset/css/MainRecommend.css";
import { useGetCursusRecommendBooks } from "~/api/cursus/useGetCursusRecommendBooks";

const MainRecommend = () => {
  const { books, options, setSelectedOption } = useGetCursusRecommendBooks();
  return (
    <section className="main__recommend__wrapper">
      <MainRecommendTitle
        options={options}
        setSelectedOption={setSelectedOption}
        description="과제를 진행하는 데 도움이 되는 추천 도서 목록입니다."
      />
      <MainRecommendList books={books} />
    </section>
  );
};

export default MainRecommend;
