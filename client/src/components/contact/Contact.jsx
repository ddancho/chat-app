import { Container } from "../styles/Contact.styled";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Contact({ contact, isOnline }) {
  const images = process.env.REACT_APP_PUBLIC_IMAGES;

  const { userInfo: user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && contact.id === parseInt(user.id)) {
      contact.profile_picture = user.profilePicture;
    }
  }, [contact, user]);

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
