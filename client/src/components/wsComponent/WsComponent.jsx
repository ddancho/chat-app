import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoList } from "../../redux/getUsersListInfo";
import { WsContext } from "./WsContext";
import ContactsOnlineEvent from "./onSocketEvent/ContactsOnlineEvent";
import ContactsUpdatedEvent from "./onSocketEvent/ContactsUpdatedEvent";
import GetMessageEvent from "./onSocketEvent/GetMessageEvent";
import NewContactEvent from "./onSocketEvent/NewContactEvent";
import NewConversationEvent from "./onSocketEvent/NewConversationEvent";

export default function WsComponent() {
  const dispatch = useDispatch();
  const ws = useContext(WsContext);

  useEffect(() => {
    ws?.emit("getContactsOnline");
  }, [ws]);

  useEffect(() => {
    dispatch(getUserInfoList());
  }, [dispatch]);

  const { userInfo: user } = useSelector((state) => state.user);

  useEffect(() => {
    user.id && ws.emit("addUser", user.id);
  }, [ws, user]);

  return (
    <>
      <ContactsOnlineEvent />
      <ContactsUpdatedEvent />
      <GetMessageEvent />
      <NewContactEvent />
      <NewConversationEvent />
    </>
  );
}
