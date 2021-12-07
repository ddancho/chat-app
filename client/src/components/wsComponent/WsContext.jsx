import React from "react";
import { io } from "socket.io-client";

export const WsContext = React.createContext();

export const wsSocket = io("http://localhost:5000/", {
  transports: ["websocket"],
  upgrade: false,
});
