import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateMsg } from "../../../redux/userSlice";
import { WsContext } from "../WsContext";
import useOnSocketEvent from "../../../customHooks/useOnSocketEvent";

export default function GetMessageEvent() {
  const dispatch = useDispatch();
  const ws = useContext(WsContext);

  const { response: onGetMessageData } = useOnSocketEvent({
    socket: ws,
    event: "getMessage",
  });
  useEffect(() => {
    dispatch(updateMsg(onGetMessageData));
  }, [onGetMessageData, dispatch]);

  return <></>;
}
