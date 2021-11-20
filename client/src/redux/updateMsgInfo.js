import { updateMsg } from "./userSlice";

export const updateMsgInfo = (msgInfo) => (dispatch) => {
  try {
    dispatch(updateMsg(msgInfo));
  } catch (err) {
    console.log(err);
  }
};
