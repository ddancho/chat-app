import { Container } from "../styles/Contact.styled";

export default function Contact({ contact, isOnline }) {
  const images = process.env.REACT_APP_PUBLIC_IMAGES;

  isOnline && console.log("user " + contact.username + " is " + isOnline);

  return (
    <Container isOn={isOnline}>
      <div>
        <img src={images + (contact.profile_picture || "person/noAvatar.png")} alt='contact' />
        <div></div>
      </div>
      <span>{contact.username}</span>
    </Container>
  );
}
