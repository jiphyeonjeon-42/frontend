import { useCallback } from "react";
import { axiosPromise } from "../util/axios";
import { useNewDialog } from "./useNewDialog";

type Method = "get" | "post" | "put" | "patch" | "delete";

export const useApi = (method: Method, url: string, data?: unknown) => {
  const { displayErrorDialog } = useNewDialog();

  const request = useCallback(
    (
      resolve: (response: any) => void,
      reject?: (error: any) => void,
    ) => {
      axiosPromise(method, url, data)
        ?.then(response => {
          resolve(response);
        })
        ?.catch(error => {
          if (reject) reject(error);
          else displayErrorDialog(error);
        });
    },
    [method, url, data],
  );

  return { request };
};
