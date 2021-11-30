import { Container } from "../styles/Contact.styled";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Contact({ contact, isOnline }) {
  const imagesFolder = process.env.REACT_APP_PUBLIC_IMAGES;
  const [image, setImage] = useState("person/noAvatar.png");

  useEffect(() => {
    setImage(contact.profile_picture);
  }, [contact]);

  const { userInfo: user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user.id && contact.id === parseInt(user.id) && contact.profile_picture !== user.profilePicture) {
      setImage(user.profilePicture);
    }
  }, [contact, user]);

  return (
    <Container isOn={isOnline}>
      <div>
        <img src={imagesFolder + image} alt='contact' />
        <div></div>
      </div>
      <span>{contact.username}</span>
    </Container>
  );
}
