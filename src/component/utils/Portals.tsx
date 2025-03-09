import { useAtomValue } from "jotai";
import { dialogConfigs } from "../../atom/dialogConfigs";
import Dialog from "./Dialog";

const Portals = () => {
  const dialogs = useAtomValue(dialogConfigs);

  return (
    <>
      {dialogs.map(config => (
        <Dialog {...config} />
      ))}
    </>
  );
};

export default Portals;
