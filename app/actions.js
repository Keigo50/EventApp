import firebase from "firebase";

export const changeEmail = text => {
  return {
    type: "change_email",
    payload: text
  };
};

export const changePassword = text => {
  return {
    type: "change_password",
    payload: text
  };
};

export const submitLogin = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: "login_start" });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({ type: "login_success" });
        dispatch({ type: "login_end" });
      })
      .catch(() => {
        dispatch({ type: "login_fail" });
        dispatch({ type: "login_end" });
      });
  };
};
