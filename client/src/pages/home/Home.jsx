import { Container } from "../styles/Home.styled";
import ConversationMenu from "../../components/conversationMenu/ConversationMenu";
import MessageMenu from "../../components/messageMenu/MessageMenu";
import ContactsOnline from "../../components/contactsOnline/ContactsOnline";
import { useDispatch } from "react-redux";
import { updateUserConversation } from "../../redux/userSlice";

export default function Home() {
  const dispatch = useDispatch();

  const handleSetCurrentConveration = (conversation) => {
    dispatch(updateUserConversation({ id: conversation.id, members: conversation.members }));
  };

  return (
    <Container>
      <ConversationMenu handleSetCurrentConveration={handleSetCurrentConveration} />
      <MessageMenu />
      <ContactsOnline />
    </Container>
  );
}
