import { useGetBooksRecommend } from "~/api/books/useGetBooksRecommend";
import MainRecommendTitle from "~/component/main/MainRecommendTitle";
import MainRecommendList from "~/component/main/MainRecommendList";
import "~/asset/css/MainRecommend.css";

const MainRecommend = () => {
  const { books, options, setOptions } = useGetBooksRecommend();
  return (
    <section className="main__recommend__wrapper">
      <MainRecommendTitle
        options={options}
        setOptions={setOptions}
        description="과제를 진행하는 데 도움이 되는 추천 도서 목록입니다."
      />
      <MainRecommendList books={books} />
    </section>
  );
};

export default MainRecommend;
