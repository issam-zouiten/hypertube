
export const SET_ALERT = "SET_ALERT";
export const RESET_ALERT = "RESET_ALERT";

export const setAlertAction = (msg) => ({
  type: SET_ALERT,
  msg,
});

export const resetAlertAction = () => ({
  type: RESET_ALERT,
});