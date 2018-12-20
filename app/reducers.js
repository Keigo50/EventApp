import { combineReducers } from "redux";
const CREATE_INITIAL_STATE = {
  /*イベント*/
  arriving: "" /*参加者データ*/,
  date: "" /*開催日時*/,
  deadlineDate: "" /* 締切日*/,
  details: "" /*詳細*/,
  eimage: null /*イベント画像*/,
  ename: "" /*イベントタイトル*/,
  place: "" /*開催場所*/,
  rnumbers: "" /**/,
  smethod: ""
};

const AUTH_INITIAL_STATE = {
  email: "",
  password: "",
  loading: false,
  loggedIn: false
};

const AuthReducer = (state = AUTH_INITIAL_STATE, action) => {
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
      return { ...state, loggedIn: true };
    case "login_fail":
      return { ...state, loggedIn: false };
    default:
      return state;
  }
};

/*イベント作成・編集画面 */
const EventCreateReducer = (state = CREATE_INITIAL_STATE, action) => {
  switch (action.type) {
    case "return_submit":
      return state
    case "return_date":
      return {
        ...state,
        date: action.payload
      };

    case "return_deadlineDate":
      return {
        ...state,
        deadlineDate: action.payload
      };

    case "return_rnumbers":
      return {
        ...state,
        rnumbers: action.payload
      };

    case "return_eimage":
      return {
        ...state,
        eimage: action.payload
      };

    case "return_ename":
      return {
        ...state,
        ename: action.payload
      };

    case "return_place":
      return {
        ...state,
        place: action.payload
      };

    case "return_details":
      return {
        ...state,
        details: action.payload
      };

    default:
      return state;
  }
};

export default combineReducers({
  auth: AuthReducer,
  create: EventCreateReducer
});
