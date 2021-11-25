import { Container } from "../styles/Home.styled";
import ConversationMenu from "../../components/conversationMenu/ConversationMenu";
import MessageMenu from "../../components/messageMenu/MessageMenu";
import ContactsOnline from "../../components/contactsOnline/ContactsOnline";

export default function Home() {
  return (
    <Container>
      <ConversationMenu />
      <MessageMenu />
      <ContactsOnline />
    </Container>
  );
}
