import { Container, Search, SearchContainer } from "../styles/ContactsOnline.styled";
import { Search as SearchUiIcon } from "@material-ui/icons";
import Contact from "../contact/Contact";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function ContactsOnline() {
  const [contactsOnline, setContactsOnline] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { usersOnline, users } = useSelector((state) => state.user);

  useEffect(() => {
    setContacts(users.contacts);
    setIsLoading(users.isLoading);
    setError(users.error);
    users.error && console.log("error :", users.error);
  }, [users]);

  useEffect(() => {
    setContactsOnline(usersOnline);
  }, [usersOnline]);

  const checkIsOnline = (arr, id) => {
    return arr.some((item) => parseInt(item.userId) === id);
  };

  return (
    <Container>
      <SearchContainer>
        <Search>
          <div>
            <SearchUiIcon />
          </div>
          <input placeholder='Search for friend' />
        </Search>
      </SearchContainer>
      {!error && !isLoading && contacts?.length > 0
        ? contacts.map((contact) => (
            <Contact
              key={contact.id}
              contact={contact}
              isOnline={checkIsOnline(contactsOnline, contact.id)}
            />
          ))
        : ""}
    </Container>
  );
}
