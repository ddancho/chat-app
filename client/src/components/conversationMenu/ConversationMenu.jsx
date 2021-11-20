import { Menu, CreateConversation, NoConversation } from "../styles/ConversationMenu.styled";
import Conversation from "../conversation/Conversation";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateUserConversationInfo } from "../../redux/updateUserConversationInfo";
import axios from "axios";
import useAxios from "../../customHooks/useAxios";

export default function ConversationMenu({ handleSetCurrentConveration }) {
  const [conversations, setConversations] = useState([]);
  const [memberEmail, setMemberEmail] = useState("");
  const [nextConversation, setNextConversation] = useState(null);
  const dispatch = useDispatch();

  const { userInfo: user, lastOpenConversation: currentConversation } = useSelector((state) => state.user);

  const { isLoading, response } = useAxios("get", "/api/v1/conversations/", user?.id);

  useEffect(() => {
    if (!isLoading) {
      setConversations(response);
    }
  }, [isLoading, response]);

  useEffect(() => {
    nextConversation && handleSetCurrentConveration(nextConversation);
    nextConversation && dispatch(updateUserConversationInfo(nextConversation));
    nextConversation && setNextConversation(null);
  }, [nextConversation, handleSetCurrentConveration, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const member = {
      memberEmail,
    };

    axios
      .post("/api/v1/conversations", member)
      .then((res) => {
        setConversations([...conversations, res.data]);
        setMemberEmail("");
      })
      .catch((err) => {
        if (err.response.status === 422) {
          console.log("it is 422", err.response);
        } else {
          console.log(err);
        }
        setMemberEmail("");
      });
  };

  return (
    <Menu>
      <div>
        {user.id ? (
          <CreateConversation onSubmit={handleSubmit} autoComplete='off'>
            <p>Create new conversation...</p>
            <div>
              <input
                type='email'
                placeholder='write your friend email address...'
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
              />
              <button type='submit'>create</button>
            </div>
          </CreateConversation>
        ) : (
          <NoConversation>
            <span>Login to create a new conversation</span>
          </NoConversation>
        )}
        {!isLoading &&
          user.id &&
          conversations?.map((conversation) => (
            <div key={conversation.id} onClick={() => setNextConversation(conversation)}>
              <Conversation
                conversation={conversation}
                user={user}
                isSelected={conversation.id === currentConversation?.id || false}
              />
            </div>
          ))}
      </div>
    </Menu>
  );
}
