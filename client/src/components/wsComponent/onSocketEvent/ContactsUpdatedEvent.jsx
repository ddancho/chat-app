import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUsersOnline } from "../../../redux/userSlice";
import { WsContext } from "../WsContext";
import useOnSocketEvent from "../../../customHooks/useOnSocketEvent";

export default function ContactsUpdatedEvent() {
  const dispatch = useDispatch();
  const ws = useContext(WsContext);

  const { response: contactsUpdated } = useOnSocketEvent({
    socket: ws,
    event: "contactsUpdated",
  });
  useEffect(() => {
    dispatch(updateUsersOnline(contactsUpdated));
  }, [contactsUpdated, dispatch]);

  return <></>;
}
