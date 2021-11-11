import { updateUserConversation } from "./userSlice";
import axios from "axios";

export const updateUserConversationInfo = (conversation) => async (dispatch) => {
  try {
    await axios
      .post("/api/v1/session/user/conversation", {
        conversationId: conversation.id,
        members: conversation.members,
      })
      .then((res) => {
        dispatch(updateUserConversation({ id: conversation.id, members: conversation.members }));
      })
      .catch((err) => {
        console.log(err.response);
      });
  } catch (err) {
    console.log(err);
  }
};
