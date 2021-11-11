import { Container } from "../styles/Conversation.styled";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Conversation({ conversation, user, isSelected }) {
  const images = process.env.REACT_APP_PUBLIC_IMAGES;
  const [member, setMember] = useState(null);

  useEffect(() => {
    const memberId = conversation.members.split(",").find((m) => m !== user.id);

    axios
      .get("/api/v1/users/" + memberId)
      .then((res) => setMember(res.data))
      .catch((err) => console.log(err));
  }, [conversation, user]);

  return (
    <Container isSelected={isSelected}>
      <img src={images + ((member && member.profilePicture) || "person/noAvatar.png")} alt='conversation' />
      <span>{(member && member.username) || ""}</span>
    </Container>
  );
}
