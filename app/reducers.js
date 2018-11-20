import { combineReducers } from "redux";

const INITIAL_STATE = {
  email: "",
  password: "",
  loading: false,
  loggedIn: "",
  day: "",
  /*イベント*/
  arriving: "" /*参加者データ*/,
  date: "" /*日付*/,
  details: "" /*詳細*/,
  eimage: "" /*イベント画像*/,
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

/*イベント作成画面 */
const EventCreateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "return_submit":
      return {
        ...state,
        date: action.payload,
        details: action.payload,
        eimage: action.payload,
        ename: action.payload,
        place: action.payload,
        rnumbers: action.payload
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

/*イベント編集画面 */
const MyEventEditingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "return_date":
      return { ...state, day: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  auth: AuthReducer,
  editing: MyEventEditingReducer,
  create: EventCreateReducer
});
