import { useCallback } from "react";
import axiosPromise from "../util/axios";
import getErrorMessage from "../constant/error";
import { useDialog } from "./useDialog";

type Method = "get" | "post" | "put" | "patch" | "delete";

export const useApi = (method: Method, url: string, data?: unknown) => {
  const { setOpenTitleAndMessage: setError, Dialog } = useDialog();

  const errorDialog = (error: any) => {
    const errorCode = error?.response?.data?.errorCode;
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    setError(title, errorCode ? message : `${message}\r\n${error?.message}`);
  };

  const request = useCallback(
    (resolve: (response: any) => void, reject?: (error: any) => void) => {
      axiosPromise(method, url, data)
        ?.then(response => {
          resolve(response);
        })
        ?.catch(error => {
          if (reject) reject(error);
          else errorDialog(error);
        });
    },
    [method, url, data],
  );

  return { request, setError, Dialog };
};
