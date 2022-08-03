import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

type Request = () => Promise<AxiosResponse> | void;

export const useRequest = <T, S, E>(
  request: Request,
  initialValue: T,
  dependencies?: S
): [T, boolean, AxiosError<E> | undefined] => {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError<E>>(new AxiosError<E>());

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
        .catch((err: AxiosError<E>) => {
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
