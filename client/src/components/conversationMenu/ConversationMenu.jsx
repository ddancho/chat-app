import { Menu, CreateConversation, NoConversation } from "../styles/ConversationMenu.styled";
import Conversation from "../conversation/Conversation";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateUserConversationInfo } from "../../redux/updateUserConversationInfo";
import axios from "axios";

export default function ConversationMenu({ handleSetCurrentConveration, currentConversation }) {
  const [conversations, setConversations] = useState([]);
  const [memberEmail, setMemberEmail] = useState("");
  const [nextConversation, setNextConversation] = useState(null);
  const dispatch = useDispatch();

  const { userInfo: user } = useSelector((state) => state.user);

  useEffect(() => {
    user.id &&
      axios
        .get("/api/v1/conversations/" + user.id)
        .then((res) => setConversations(res.data))
        .catch((err) => console.log(err));
  }, [user]);

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
        {user.id &&
          conversations.map((conversation) => (
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
