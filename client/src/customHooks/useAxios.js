import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost";

const useAxios = (method, url, params, dependency) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let Url = url;

        if (params !== null && (typeof params === "string" || typeof params === "number")) {
          Url += params;
        }

        const res = await axios({ method, url: Url });
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

    if (params && dependency) {
      fetchData();
    }

    return () => {
      setIsLoading(false);
      setResponse(null);
      setError(null);
    };
  }, [method, url, params, dependency]);

  return { isLoading, response, error };
};

export default useAxios;
