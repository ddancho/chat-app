import { useState, useEffect } from "react";

const useOnSocketEvent = ({ socket = null, event = null }) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    if (socket && event) {
      socket.on(event, (data) => setResponse(data));
    }

    return () => {
      setResponse(null);
      abortController.abort();
    };
  }, [socket, event]);

  return { response };
};

export default useOnSocketEvent;
