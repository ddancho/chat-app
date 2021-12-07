import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUsersList } from "../../../redux/userSlice";
import { WsContext } from "../WsContext";
import useOnSocketEvent from "../../../customHooks/useOnSocketEvent";

export default function NewContactEvent() {
  const dispatch = useDispatch();
  const ws = useContext(WsContext);

  const { response: newContact } = useOnSocketEvent({
    socket: ws,
    event: "newContact",
  });
  useEffect(() => {
    if (newContact) {
      dispatch(updateUsersList({ user: newContact }));
    }
  }, [newContact, dispatch]);

  return <></>;
}
