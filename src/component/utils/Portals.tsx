import { useRecoilValue } from "recoil";
import { dialogConfigs } from "../../atom/dialogConfigs";
import Dialog from "./Dialog";

const Portals = () => {
  const dialogs = useRecoilValue(dialogConfigs);

  return (
    <>
      {dialogs.map(config => (
        <Dialog {...config} />
      ))}
    </>
  );
};

export default Portals;
