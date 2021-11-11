import { Container, Contacts } from "../styles/Home.styled";
import ConversationMenu from "../../components/conversationMenu/ConversationMenu";
import MessageMenu from "../../components/messageMenu/MessageMenu";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentConversation, setCurrentConversation] = useState(null);
  const { lastOpenConversation } = useSelector((state) => state.user);

  useEffect(() => {
    lastOpenConversation?.id && setCurrentConversation(lastOpenConversation);
  }, [lastOpenConversation]);

  const handleSetCurrentConveration = (conversation) => {
    setCurrentConversation(conversation);
  };

  return (
    <Container>
      <ConversationMenu
        handleSetCurrentConveration={handleSetCurrentConveration}
        currentConversation={currentConversation}
      />
      <MessageMenu currentConversation={currentConversation} />
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
