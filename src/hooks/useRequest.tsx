import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

type Request = () => Promise<AxiosResponse>;

export const useRequest = <T, S>(
  request: Request,
  initialValue: T,
  dependencies?: S
): [T, boolean, string] => {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    request()
      .then((response: AxiosResponse) => {
        setData(response.data);
      })
      .catch((err: any) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dependencies]);

  return [data, loading, error];
};
