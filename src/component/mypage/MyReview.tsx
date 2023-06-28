import InquireBoxTitle from "../utils/InquireBoxTitle";
import Reserve from "../../asset/img/list-check-solid.svg";
import HandleReview from "../book/review/HandleReview";
import { axiosPromise } from "../../util/axios";
import Pagination from "../utils/Pagination";
import { useGetMyReviewInfo } from "../../api/reviews/useGetMyReviewInfo";
import "../../asset/css/MyReview.css";

type Props = {
  type: string;
};

const MyReview = ({ type }: Props) => {
  const checkLogin = window.localStorage.getItem("user");
  const { page, setPage, lastPage, reviewList, setReviewList } =
    useGetMyReviewInfo();

  const deleteReview = (reviewId: number) => {
    const temp = reviewList.filter(review => review.reviewsId !== reviewId);
    setReviewList(temp);
    axiosPromise("delete", `/reviews/${reviewId}`);
  };

  return (
    <>
      <div className="mypage-inquire-box-long-wrapper">
        <InquireBoxTitle
          Icon={Reserve}
          titleKO="내가 쓴 후기"
          titleEN="review data"
          KOsize="font-20-bold"
          ENsize="font-14"
        />
        <div className="mypage-inquire-box-long">
          <div className="mypage-review_box-wrapper">
            {reviewList.map(review => (
              <HandleReview
                key={review.reviewsId}
                data={review}
                nickname={review.nickname}
                createdAt={review.createdAt}
                checkLogin={checkLogin}
                type={type}
                onClickDel={deleteReview}
              />
            ))}
          </div>
          {reviewList.length !== 0 && (
            <div className="mypage_review_pagination">
              <Pagination page={page} setPage={setPage} lastPage={lastPage} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyReview;
