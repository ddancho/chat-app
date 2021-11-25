import { Container, Search, SearchContainer } from "../styles/ContactsOnline.styled";
import { Search as SearchUiIcon } from "@material-ui/icons";
import Contact from "../contact/Contact";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useAxios from "../../customHooks/useAxios";

export default function ContactsOnline() {
  const [contacts, setContacts] = useState([]);
  const [contactsOnline, setContactsOnline] = useState([]);

  const { isLoading, response, error } = useAxios("get", "/api/v1/users");

  useEffect(() => {
    if (error && error.status !== 404) {
      console.log(error.data);
    }
  }, [error]);

  useEffect(() => {
    if (!isLoading && response) {
      setContacts(response);
    }
  }, [isLoading, response]);

  const { usersOnline, userNewUpload } = useSelector((state) => state.user);

  useEffect(() => {
    if (userNewUpload && contacts?.length > 0) {
      let i = contacts.findIndex((c) => c.id === userNewUpload.userId);
      if (i !== -1 && contacts[i].profile_picture !== userNewUpload.profilePicture) {
        contacts[i].profile_picture = userNewUpload.profilePicture;
      }
    }
  }, [userNewUpload, contacts]);

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
      {!isLoading && contacts?.length > 0
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
