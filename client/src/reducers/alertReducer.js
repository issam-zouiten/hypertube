import { SET_ALERT, RESET_ALERT } from "../actions/alertAction";

const initialState = {
  text: "",
  color: "",
};

export default function alertReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return action.msg;

    case RESET_ALERT:
      return initialState;
    default:
      return state;
  }
}