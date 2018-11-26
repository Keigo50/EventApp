import { combineReducers } from "redux";
const INITIAL_STATE = {
  email: "",
  password: "",
  loading: false,
  loggedIn: "",
  /*イベント*/
  arriving: "" /*参加者データ*/,
  day: "" /*日付*/,
  details: "" /*詳細*/,
  eimage: null /*イベント画像*/,
  ename: "" /*イベントタイトル*/,
  place: "" /*開催場所*/,
  rnumbers: "" /**/,
  smethod: ""
  /*生徒*/

  /*教師*/
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

/*イベント作成・編集画面 */
const EventCreateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "return_submit":
      return {
        ...state,
        day,
        details,
        eimage,
        ename,
        place,
        rnumbers
      };

    case "return_day":
      return {
        ...state,
        day: action.payload
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
