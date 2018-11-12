import { combineReducers } from "redux";

const INITIAL_STATE = {
  email: "",
  password: "",
  loading: false,
  loggedIn: ""
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "change_email":
      return { ...state, email: action.payload };
    case "change_password":
      return { ...state, password: action.payload };
    case "login_start":
      return { ...state, loading: true };
    case "login_end":
      return { ...state, loading: false };
    case "login_success":
      return { ...state, loggedIn: "ログイン中" };
    case "login_fail":
      return { ...state, loggedIn: "" };
    default:
      return state;
  }
};

export default combineReducers({
  auth: AuthReducer
});
