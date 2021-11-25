import { useState, useEffect } from "react";

const useOnSocketEvent = ({ socket, event }) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (socket && event) {
      socket.on(event, (data) => setResponse(data));
    }
    return () => {
      setResponse(null);
    };
  }, [socket, event]);

  return { response };
};

export default useOnSocketEvent;
