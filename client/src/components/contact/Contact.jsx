import { Container } from "../styles/Contact.styled";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

export default function Contact({ contact, isOnline }) {
  const images = process.env.REACT_APP_PUBLIC_IMAGES;
  const profilePicture = useRef();
  profilePicture.current = "person/noAvatar.png";

  const { userInfo: user } = useSelector((state) => state.user);

  useEffect(() => {
    profilePicture.current = contact.profile_picture;

    if (user && contact.id === parseInt(user.id)) {
      profilePicture.current = user.profilePicture;
    }
  }, [contact, user]);

  return (
    <Container isOn={isOnline}>
      <div>
        <img src={images + profilePicture.current} alt='contact' />
        <div></div>
      </div>
      <span>{contact.username}</span>
    </Container>
  );
}
