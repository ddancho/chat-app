import { Chat, Top, Bottom, NoConversation } from "../styles/MessageMenu.styled";
import Message from "../message/Message";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import useAxios from "../../customHooks/useAxios";

export default function MessageMenu({ socket }) {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");
  const scrollToLastMsg = useRef();

  const {
    userInfo: user,
    lastOpenConversation: currentConversation,
    msgInfo,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (
      msgInfo?.msg &&
      currentConversation?.id === parseInt(msgInfo.msg.conversation_id) &&
      currentConversation?.members.includes(msgInfo.senderId)
    ) {
      setMessages((prev) => [...prev, msgInfo.msg]);
    }
  }, [msgInfo, currentConversation]);

  const { isLoading, response } = useAxios("get", "/api/v1/messages/", currentConversation?.id);

  useEffect(() => {
    if (!isLoading) {
      setMessages(response);
    }
  }, [isLoading, response]);

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
      {!isLoading && user?.id ? (
        <div>
          <Top>
            {messages?.map((message) => (
              <div ref={scrollToLastMsg} key={message.id}>
                <Message message={message} own={message.sender_id === user.id} />
              </div>
            ))}
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
      ) : (
        <NoConversation>
          <span>Open a conversation to start a chat</span>
        </NoConversation>
      )}
    </Chat>
  );
}
