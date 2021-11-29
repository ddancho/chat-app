import { getUsersList } from "./userSlice";
import axios from "axios";

export const getUserInfoList = () => async (dispatch) => {
  try {
    dispatch(getUsersList({ contacts: [], isLoading: true, error: null }));
    await axios
      .get("/api/v1/users")
      .then((res) => {
        dispatch(getUsersList({ contacts: res.data, isLoading: false, error: null }));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(getUsersList({ contacts: [], isLoading: false, error: err.response }));
      });
  } catch (err) {
    dispatch(getUsersList({ contacts: [], isLoading: false, error: err }));
  }
};
