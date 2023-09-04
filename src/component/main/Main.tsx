import MainBanner from "~/component/main/MainBanner";
import MainNew from "~/component/main/MainNew";
import MainRecommend from "~/component/main/MainRecommend";
import MainPopular from "~/component/main/MainPopular";
import "~/asset/css/Main.css";

const Main = () => {
  return (
    <main className="main-wrapper">
      <MainBanner />
      <MainNew />
      <MainRecommend />
      <MainPopular />
    </main>
  );
};

export default Main;
