import {
  Container,
  Menu,
  Chat,
  Contacts,
  Top,
  Bottom,
  NoConversation,
  CreateConversation,
} from "../styles/Home.styled";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Home() {
  const [conversations, setConversations] = useState([]);
  const [memberEmail, setMemberEmail] = useState("");
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollToLastMsg = useRef();

  const { userInfo: user } = useSelector((state) => state.user);

  useEffect(() => {
    user.id &&
      axios
        .get("/api/v1/conversations/" + user.id)
        .then((res) => setConversations(res.data))
        .catch((err) => console.log(err));
  }, [user]);

  useEffect(() => {
    currentConversation &&
      axios
        .get("/api/v1/messages/" + currentConversation.id)
        .then((res) => setMessages(res.data))
        .catch((err) => console.log(err));
  }, [currentConversation]);

  useEffect(() => {
    scrollToLastMsg.current && scrollToLastMsg.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleNewConSubmit = (e) => {
    e.preventDefault();

    const member = {
      memberEmail,
    };

    axios
      .post("/api/v1/conversations", member)
      .then((res) => {
        setConversations([...conversations, res.data]);
        setMemberEmail("");
      })
      .catch((err) => {
        if (err.response.status === 422) {
          console.log("it is 422");
        } else {
          console.log(err);
        }
        setMemberEmail("");
      });
  };

  const handleMsgSubmit = (e) => {
    e.preventDefault();

    const message = {
      senderId: user.id,
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
    <Container>
      <Menu>
        <div>
          {user.id ? (
            <CreateConversation onSubmit={handleNewConSubmit} autoComplete='off'>
              <p>Create new conversation...</p>
              <div>
                <input
                  type='email'
                  placeholder='write your friend email address...'
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                />
                <button type='submit'>create</button>
              </div>
            </CreateConversation>
          ) : (
            <NoConversation>
              <span>Login to create a new conversation</span>
            </NoConversation>
          )}
          {user.id &&
            conversations.map((conversation) => (
              <div key={conversation.id} onClick={() => setCurrentConversation(conversation)}>
                <Conversation conversation={conversation} user={user} />
              </div>
            ))}
        </div>
      </Menu>
      <Chat>
        {currentConversation ? (
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
      <Contacts>
        <div>
          <ChatOnline />
          <ChatOnline />
          <ChatOnline />
        </div>
      </Contacts>
    </Container>
  );
}
