import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IAuthError, IUserResponse } from "../types/types";

type Request = () => Promise<AxiosResponse<IUserResponse | IAuthError>> | void;

export const useRequest = <T, S>(
  request: Request,
  initialValue: T,
  dependencies?: S
): [T, boolean, AxiosError | undefined] => {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError>(
    new AxiosError<IUserResponse | IAuthError>()
  );

  useEffect(() => {
    setLoading(true);
    const result = request();
    console.log(result);
    if (result) {
      result
        .then((response: AxiosResponse) => {
          console.log(response);
          setData(response.data);
        })
        .catch((err: AxiosError) => {
          console.log(err);
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [dependencies]);

  return [data, loading, error];
};
