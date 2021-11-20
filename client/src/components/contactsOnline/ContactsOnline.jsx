import { Container } from "../styles/ContactsOnline.styled";
import Contact from "../contact/Contact";
import { useState, useEffect } from "react";
import useOnSocketEvent from "../../customHooks/useOnSocketEvent";
import useAxios from "../../customHooks/useAxios";

export default function ContactsOnline({ socket }) {
  const [contacts, setContacts] = useState([]);
  const [contactsOnline, setContactsOnline] = useState([]);

  const { response: usersOnline } = useOnSocketEvent({
    socket: socket?.current,
    event: "contactsUpdated",
  });

  useEffect(() => {
    setContactsOnline(usersOnline);
  }, [usersOnline]);

  const { isLoading, response } = useAxios("get", "/api/v1/users");

  useEffect(() => {
    if (!isLoading) {
      setContacts(response);
    }
  }, [isLoading, response]);

  return (
    <Container>
      {!isLoading && contacts?.length > 0
        ? contacts.map((contact) => (
            <Contact
              key={contact.id}
              contact={contact}
              isOnline={contactsOnline?.some((c) => parseInt(c.userId) === contact.id)}
            />
          ))
        : ""}
    </Container>
  );
}
