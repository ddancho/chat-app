import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUsersOnline } from "../../../redux/userSlice";
import { WsContext } from "../WsContext";
import useOnSocketEvent from "../../../customHooks/useOnSocketEvent";

export default function ContactsOnlineEvent() {
  const dispatch = useDispatch();
  const ws = useContext(WsContext);

  const { response: contactsOnline } = useOnSocketEvent({
    socket: ws,
    event: "contactsOnline",
  });

  useEffect(() => {
    dispatch(updateUsersOnline(contactsOnline));
  }, [contactsOnline, dispatch]);

  return <></>;
}
