import { Container } from "../styles/Home.styled";
import ConversationMenu from "../../components/conversationMenu/ConversationMenu";
import MessageMenu from "../../components/messageMenu/MessageMenu";
import ContactsOnline from "../../components/contactsOnline/ContactsOnline";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { updateMsgInfo } from "../../redux/updateMsgInfo";
import { updateUserConversation } from "../../redux/userSlice";
import useOnSocketEvent from "../../customHooks/useOnSocketEvent";
import useEmitSocketEvent from "../../customHooks/useEmitSocketEvent";

export default function Home() {
  const socket = useRef();
  const dispatch = useDispatch();

  const { userInfo: user } = useSelector((state) => state.user);

  useEffect(() => {
    socket.current = io("http://localhost/", {
      path: "/socket.io",
      transports: ["websocket"],
      upgrade: false,
    });
  }, []);

  useEmitSocketEvent({ socket: socket?.current, event: "addUser", data: user?.id });

  const { response: onGetMessageData } = useOnSocketEvent({
    socket: socket?.current,
    event: "getMessage",
  });
  useEffect(() => {
    dispatch(updateMsgInfo(onGetMessageData));
  }, [dispatch, onGetMessageData]);

  const handleSetCurrentConveration = (conversation) => {
    dispatch(updateUserConversation({ id: conversation.id, members: conversation.members }));
  };

  return (
    <Container>
      <ConversationMenu handleSetCurrentConveration={handleSetCurrentConveration} />
      {socket?.current && <MessageMenu socket={socket} />}
      {socket?.current && <ContactsOnline socket={socket} />}
    </Container>
  );
}
