import { useCallback } from "react";
import axiosPromise from "../util/axios";
import getErrorMessage from "../data/error";
import useDialog from "./useDialog";

const useApi = (method, url, data) => {
  const { setOpenTitleAndMessage: setError, Dialog } = useDialog();

  const errorDialog = error => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    setError(title, errorCode ? message : `${message}\r\n${error?.message}`);
  };

  const request = useCallback(
    (resolve, reject = errorDialog) => {
      axiosPromise(method, url, data)
        ?.then(response => {
          resolve(response);
        })
        ?.catch(error => {
          reject(error);
        });
      // .finally(() => {
      //   console.log(`called ${url} ${JSON.stringify(data)}`);
      // });
    },
    [method, url, data],
  );

  return { request, setError, Dialog };
};

export default useApi;
