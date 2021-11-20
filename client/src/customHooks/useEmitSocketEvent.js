import { useEffect } from "react";

const useEmitSocketEvent = ({ socket = null, event = null, data = null }) => {
  useEffect(() => {
    const abortController = new AbortController();

    if (socket && event && data) {
      socket.emit(event, data);
    }

    return () => {
      abortController.abort();
    };
  }, [socket, event, data]);

  return;
};

export default useEmitSocketEvent;
