import { useGetTagsMainpage } from "../../api/tags/useGetTagsMainpage";
import SubTitle from "../utils/SubTitle";
import MainTagList from "./MainTagList";
import "../../asset/css/Tags.css";

const MainTag = () => {
  const { tagData } = useGetTagsMainpage();
  const tags = Array.isArray(tagData?.list)
    ? tagData.list
        .filter(tag => tag.visibility === "public")
        .map(tag => tag.content)
    : [];

  return (
    <section className="main-tag">
      <div className="main-tag__wrapper">
        <SubTitle
          subTitle="책들에 달린 태그를 확인해보세요."
          description="태그를 클릭하면 태그가 달려있는 책들이 검색 됩니다."
          alignItems="center"
        />
      </div>
      <div className="main-tag__wrapper">
        <MainTagList tags={tags} />
      </div>
    </section>
  );
};

export default MainTag;
