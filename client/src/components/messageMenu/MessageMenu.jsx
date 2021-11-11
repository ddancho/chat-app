import { Chat, Top, Bottom, NoConversation } from "../styles/MessageMenu.styled";
import Message from "../message/Message";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function MessageMenu({ currentConversation }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollToLastMsg = useRef();

  const { userInfo: user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.id && currentConversation?.id) {
      axios
        .get("/api/v1/messages/" + currentConversation.id)
        .then((res) => setMessages(res.data))
        .catch((err) => console.log(err));
    }
  }, [user, currentConversation]);

  useEffect(() => {
    scrollToLastMsg.current && scrollToLastMsg.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMsgSubmit = (e) => {
    e.preventDefault();

    const message = {
      senderId: user.id,
      senderName: user.username,
      senderProfilePicture: user.profilePicture,
      text: newMessage,
      conversationId: currentConversation.id,
    };

    axios
      .post("/api/v1/messages", message)
      .then((res) => {
        setMessages([...messages, res.data]);
        setNewMessage("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Chat>
      {user.id && currentConversation ? (
        <div>
          <Top>
            {messages.map((message) => (
              <div ref={scrollToLastMsg} key={message.id}>
                <Message message={message} own={message.sender_id === user.id} />
              </div>
            ))}
          </Top>
          <Bottom>
            <textarea
              placeholder='write something...'
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
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
