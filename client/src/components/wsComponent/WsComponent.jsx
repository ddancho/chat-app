import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsersOnline, updateMsg, updateUsersList } from "../../redux/userSlice";
import { getUserInfoList } from "../../redux/getUsersListInfo";
import { io } from "socket.io-client";
import useOnSocketEvent from "../../customHooks/useOnSocketEvent";

export default function WsComponent() {
  const dispatch = useDispatch();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost/", {
      path: "/socket.io",
      transports: ["websocket"],
      upgrade: false,
    });
    socket.current.emit("getContactsOnline");
  }, []);

  useEffect(() => {
    dispatch(getUserInfoList());
  }, [dispatch]);

  const { userInfo: user } = useSelector((state) => state.user);

  useEffect(() => {
    socket.current.emit("addUser", user?.id);
  }, [user]);

  const { response: contactsOnline } = useOnSocketEvent({
    socket: socket.current,
    event: "contactsOnline",
  });
  useEffect(() => {
    dispatch(updateUsersOnline(contactsOnline));
  }, [contactsOnline, dispatch]);

  const { response: contactsUpdated } = useOnSocketEvent({
    socket: socket.current,
    event: "contactsUpdated",
  });
  useEffect(() => {
    dispatch(updateUsersOnline(contactsUpdated));
  }, [contactsUpdated, dispatch]);

  const { response: onGetMessageData } = useOnSocketEvent({
    socket: socket?.current,
    event: "getMessage",
  });
  useEffect(() => {
    dispatch(updateMsg(onGetMessageData));
  }, [onGetMessageData, dispatch]);

  const { response: newContact } = useOnSocketEvent({
    socket: socket.current,
    event: "newContact",
  });
  useEffect(() => {
    if (newContact) {
      dispatch(updateUsersList({ user: newContact }));
    }
  }, [newContact, dispatch]);

  return <></>;
}
