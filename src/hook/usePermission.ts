import { useRecoilValue } from "recoil";
import { userAtom } from "~/atom/userAtom"
import { useNewDialog } from "~/hook/useNewDialog";

export const usePermission = () => {
  const user = useRecoilValue(userAtom);

  const isLoggined = user !== null;
  const isAdmin = user?.isAdmin;
  const is42Authenticated = user.email !== user.userName;

  const { addDialogWithTitleAndMessage } = useNewDialog();

  const excuteOnly42Authenticated = (
    callback: () => void,
    forbiddenMessage?: string,
  ) => {
    if (is42Authenticated) {
      callback();
      return;
    }
    addDialogWithTitleAndMessage(
      "not authenticated",
      forbiddenMessage || "42 인증 유저만 접근할 수 있는 기능입니다.",
      "42 인증은 마이페이지에서 진행하실 수 있습니다.",
    );
  };

  return { isLoggined, isAdmin, is42Authenticated, excuteOnly42Authenticated };
};
