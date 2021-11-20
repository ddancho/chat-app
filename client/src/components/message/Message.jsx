import { Container, Top, Bottom } from "../styles/Message.styled";
import TimeAgo from "react-timeago";

export default function Message({ own, message }) {
  const images = process.env.REACT_APP_PUBLIC_IMAGES;

  return (
    <Container own={own}>
      <Top own={own}>
        <img
          src={images + ((message.id && message.sender_profile_picture) || "person/noAvatar.png")}
          alt='message'
        />
        <p>{message.text}</p>
      </Top>
      <Bottom>
        <p>{message.sender_name}</p>
        <TimeAgo date={message.created_at} />
      </Bottom>
    </Container>
  );
}
