import { Outlet } from "react-router-dom";
import Banner from "../utils/Banner";
import "../../css/MypageRoutes.css";

function MyPageRoutes() {
  return (
    <main>
      <Banner img="mypage" titleKo="마이페이지" titleEn="MYPAGE" />
      <div className="mypage-wrapper">
        <section className="mypage-section">
          <Outlet />
        </section>
      </div>
    </main>
  );
}

export default MyPageRoutes;
