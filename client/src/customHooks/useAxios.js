import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost";

const useAxios = (method, url, params, data) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    let Url = url;

    if (typeof params === "string" || typeof params === "number") {
      Url += params;
    }

    const fetchData = async () => {
      try {
        const res = await axios({ method, url: Url, data });
        const result = await res?.data;

        setResponse(result);
        setError(null);
        setIsLoading(false);
      } catch (error) {
        setError(error.response);
        setIsLoading(false);
        setResponse(null);
      }
    };

    fetchData();

    return () => {
      setIsLoading(false);
      setResponse(null);
      setError(null);
    };
  }, [method, url, params, data]);

  return { isLoading, response, error };
};

export default useAxios;
