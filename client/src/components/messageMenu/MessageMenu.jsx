import { Chat, Top, Bottom, NoConversation } from "../styles/MessageMenu.styled";
import Message from "../message/Message";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { updateMsg } from "../../redux/userSlice";
import axios from "axios";
import useAxios from "../../customHooks/useAxios";

export default function MessageMenu() {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");
  const scrollToLastMsg = useRef();
  const socket = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io("http://localhost/", {
      path: "/socket.io",
      transports: ["websocket"],
      upgrade: false,
    });
  }, []);

  const {
    userInfo: user,
    lastOpenConversation: currentConversation,
    msgInfo,
  } = useSelector((state) => state.user);

  const { isLoading, response, error } = useAxios(
    "get",
    "/api/v1/messages/",
    currentConversation.id,
    currentConversation
  );

  useEffect(() => {
    if (!isLoading && !response && error) {
      setMessages([]);
    }
    if (!isLoading && response) {
      setMessages(response);
    }
  }, [isLoading, response, error]);

  useEffect(() => {
    if (
      msgInfo?.msg &&
      currentConversation?.id === parseInt(msgInfo.msg.conversation_id) &&
      currentConversation?.members.includes(msgInfo.senderId)
    ) {
      setMessages((prev) => [...prev, msgInfo.msg]);
      dispatch(updateMsg(null));
    }
  }, [msgInfo, currentConversation, dispatch]);

  useEffect(() => {
    scrollToLastMsg.current && scrollToLastMsg.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMsgSubmit = (e) => {
    e.preventDefault();

    const message = {
      senderId: user.id,
      senderName: user.username,
      senderProfilePicture: user.profilePicture,
      text: newMessageText,
      conversationId: currentConversation.id,
    };

    axios
      .post("/api/v1/messages", message)
      .then((res) => {
        setMessages([...messages, res.data]);
        setNewMessageText("");
        socket.current.emit("sendMessage", {
          senderId: user.id,
          receiverId: currentConversation.members.split(",").find((id) => id !== user.id),
          msg: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Chat>
      {(!isLoading && user?.id && (
        <div>
          <Top>
            {messages?.length > 0 ? (
              messages.map((message) => (
                <div ref={scrollToLastMsg} key={message.id}>
                  <Message message={message} own={message.sender_id === parseInt(user.id)} />
                </div>
              ))
            ) : (
              <NoConversation>
                <span>No messages in the current conversation</span>
              </NoConversation>
            )}
          </Top>
          <Bottom>
            <textarea
              placeholder='write something...'
              onChange={(e) => setNewMessageText(e.target.value)}
              value={newMessageText}
            ></textarea>
            <button onClick={handleMsgSubmit}>send</button>
          </Bottom>
        </div>
      )) || (
        <NoConversation>
          <span>Open a conversation to start a chat</span>
        </NoConversation>
      )}
    </Chat>
  );
}
