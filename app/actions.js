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

/*イベント作成画面*/
export const returnRnumbers = rnumbers => {
  return {
    type: "return_rnumbers",
    payload: rnumbers
  };
};

export const returnEimage = eimage => {
  return {
    type: "return_eimage",
    payload: eimage
  };
};

export const returnDate = day => {
  return {
    type: "return_date",
    payload: day
  };
};

export const returnEname = ename => {
  return {
    type: "return_ename",
    payload: ename
  };
};

export const returnPlace = place => {
  return {
    type: "return_place",
    payload: place
  };
};

export const returnDetails = details => {
  return {
    type: "return_details",
    payload: details
  };
};

export const returnSubmit = (date, details, eimage, ename, place, rnumbers) => {
  return {
    type: "return_submit",
    payload: date,
    details,
    eimage,
    ename,
    place,
    rnumbers
  };
};
