import { getUser } from "./userSlice";
import axios from "axios";

export const getUserInfo = () => async (dispatch) => {
  try {
    await axios
      .get("/api/v1/session/user")
      .then((res) => {
        dispatch(getUser(res.data));
      })
      .catch((err) => {
        console.log(err.response);
      });
  } catch (err) {
    console.log(err);
  }
};
