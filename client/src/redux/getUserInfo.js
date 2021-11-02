import { getUser, setIsError, setIsLoading } from "./userSlice";
import axios from "axios";

export const getUserInfo = () => async (dispatch) => {
  try {
    dispatch(setIsLoading());
    await axios
      .get("/api/v1/session/user")
      .then((res) => dispatch(getUser(res.data)))
      .catch((err) => {
        dispatch(setIsError());
      });
  } catch (err) {
    dispatch(setIsError());
  }
};
