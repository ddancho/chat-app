import { updateUsersOnline } from "./userSlice";

export const updateUsersOnlineInfo = (usersOnline) => (dispatch) => {
  try {
    dispatch(updateUsersOnline(usersOnline));
  } catch (err) {
    console.log(err);
  }
};
