import { Container, Top, Bottom } from "../styles/Message.styled";
import TimeAgo from "react-timeago";

export default function Message({ own, message }) {
  return (
    <Container own={own}>
      <Top own={own}>
        <img
          src='https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128_960_720.png'
          alt='message'
        />
        <p>{message.text}</p>
      </Top>
      <Bottom>
        <TimeAgo date={message.created_at} />
      </Bottom>
    </Container>
  );
}
