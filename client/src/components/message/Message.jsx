import { Container, Top, Bottom } from "../styles/Message.styled";

export default function Message({ own }) {
  return (
    <Container own={own}>
      <Top own={own}>
        <img
          src='https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128_960_720.png'
          alt='message'
        />
        <p>Hello This is a message</p>
      </Top>
      <Bottom>1 hour ago</Bottom>
    </Container>
  );
}
