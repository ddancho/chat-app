import { Menu, CreateConversation, NoConversation, ErrMsg } from "../styles/ConversationMenu.styled";
import Conversation from "../conversation/Conversation";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { updateUserConversationInfo } from "../../redux/updateUserConversationInfo";
import { updateUserConversation, updateNewConversation } from "../../redux/userSlice";
import { WsContext } from "../wsComponent/WsContext";
import axios from "axios";
import useAxios from "../../customHooks/useAxios";

export default function ConversationMenu() {
  const [conversations, setConversations] = useState([]);
  const [memberEmail, setMemberEmail] = useState("");
  const [nextConversation, setNextConversation] = useState(null);
  const [createConversationErrors, setCreateConversationErrors] = useState(null);

  const dispatch = useDispatch();
  const ws = useContext(WsContext);

  const {
    userInfo: user,
    lastOpenConversation: currentConversation,
    newConversation,
  } = useSelector((state) => state.user);

  const { isLoading, response, error } = useAxios("get", "/api/v1/conversations/", user?.id, user?.id);

  useEffect(() => {
    setCreateConversationErrors(null);
  }, []);

  useEffect(() => {
    if (!isLoading && !response && error) {
      setConversations([]);
    }
    if (!isLoading && response) {
      setConversations(response);
    }
  }, [isLoading, response, error]);

  useEffect(() => {
    if (newConversation?.id && user?.id) {
      const members = newConversation.members.split(",");
      const isMember = members.some((m) => m === user.id);

      if (isMember) {
        if (!conversations.some((c) => c.id === newConversation.id)) {
          setConversations([...conversations, newConversation]);
          dispatch(updateUserConversation({ id: newConversation.id, members: newConversation.members }));
        }
      }
      dispatch(updateNewConversation(null));
    }
  }, [newConversation, user, conversations, dispatch]);

  useEffect(() => {
    nextConversation && dispatch(updateUserConversationInfo(nextConversation));
    nextConversation && setNextConversation(null);
  }, [nextConversation, dispatch]);

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
        setCreateConversationErrors(null);
        dispatch(updateUserConversationInfo(res.data));
        ws?.emit("newConversationCreated", res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setCreateConversationErrors(err.response.data.errors);
        } else if (err.response.status === 422) {
          setCreateConversationErrors(err.response.data.emailErrors);
        } else {
          setCreateConversationErrors(["Please try again later..."]);
        }
      });
  };

  return (
    <Menu>
      <div>
        {!isLoading && user.id ? (
          <CreateConversation onSubmit={handleSubmit} autoComplete='off'>
            <p>Create new conversation...</p>
            <div>
              <input
                type='text'
                placeholder='write your friend email address...'
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
              />

              <button type='submit'>create</button>
            </div>
            <ErrMsg showMsg={createConversationErrors?.length > 0 ? "visible" : "hidden"}>
              <p>{(createConversationErrors?.length > 0 && createConversationErrors[0]) || 0}</p>
            </ErrMsg>
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
