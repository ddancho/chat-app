import { Container, Menu, Chat, Contacts, Top, Bottom } from "../styles/Home.styled";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";

export default function Home() {
  return (
    <Container>
      <Menu>
        <div>
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
        </div>
      </Menu>
      <Chat>
        <div>
          <Top>
            <Message own={true} />
            <Message own={false} />
            <Message own={true} />
            <Message own={false} />
            <Message own={true} />
            <Message own={false} />
            <Message own={true} />
            <Message own={false} />
            <Message own={true} />
            <Message own={false} />
            <Message own={true} />
            <Message own={false} />
            <Message own={true} />
            <Message own={false} />
            <Message own={true} />
            <Message own={false} />
            <Message own={true} />
          </Top>
          <Bottom>
            <textarea placeholder='write something...'></textarea>
            <button>send</button>
          </Bottom>
        </div>
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
