import MainBanner from "./MainBanner";
import MainNew from "./MainNew";
import MainPopular from "./MainPopular";
import "../../asset/css/Main.css";

const Main = () => {
  return (
    <main className="main-wrapper">
      <MainBanner />
      <MainNew />
      <MainPopular />
    </main>
  );
};

export default Main;
