import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNewConversation } from "../../../redux/userSlice";
import { WsContext } from "../WsContext";
import useOnSocketEvent from "../../../customHooks/useOnSocketEvent";

export default function NewConversationEvent() {
  const dispatch = useDispatch();
  const ws = useContext(WsContext);

  const { response: newConversation } = useOnSocketEvent({
    socket: ws,
    event: "newConversation",
  });
  useEffect(() => {
    if (newConversation) {
      dispatch(updateNewConversation(newConversation));
    }
  }, [newConversation, dispatch]);

  return <></>;
}
