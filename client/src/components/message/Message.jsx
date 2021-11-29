import { Container, Top, Bottom, BorderLine } from "../styles/Message.styled";
import TimeAgo from "react-timeago";

export default function Message({ own, message }) {
  return (
    <Container own={own}>
      <Top own={own}>
        <p>{message.text}</p>
      </Top>
      <Bottom>
        <p>{message.sender_name}</p>
        <TimeAgo date={message.created_at} />
      </Bottom>
      <BorderLine />
    </Container>
  );
}
