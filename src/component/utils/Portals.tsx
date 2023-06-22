import { useRecoilValue } from "recoil";
import { dialogConfigs } from "../../atom/dialogConfigs";
import Dialog from "./Dialog";
import { filterDuplicateKeys } from "../../util/filterDuplicateKeys";

const Portals = () => {
  const dialogs = useRecoilValue(dialogConfigs);

  return (
    <>
      {filterDuplicateKeys(dialogs).map(config => (
        <Dialog {...config} />
      ))}
    </>
  );
};

export default Portals;
