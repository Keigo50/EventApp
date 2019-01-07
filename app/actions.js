import firebase from "firebase";

export const checkLogin = () => {
  return dispatch => {
    dispatch({ type: "login_start" });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch({ type: "login_success" });
        dispatch({ type: "login_end" });
      } else {
        dispatch({ type: "login_fail" });
        dispatch({ type: "login_end" });
      }
    });
  };
};

/*ホーム画面*/

export const returnFetchData = doc => {
  return {
    type: "return_fetchData",
    payload: doc
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

export const returnDate = date => {
  return {
    type: "return_date",
    payload: date
  };
};

export const returnDeadlineDate = deadlineDate => {
  return {
    type: "return_deadlineDate",
    payload: deadlineDate
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

export const returnSubmit = (
  date,
  deadlineDate,
  details,
  eimage,
  ename,
  place,
  rnumbers
) => {
  return {
    type: "return_submit",
    payload: date,
    deadlineDate,
    details,
    eimage,
    ename,
    place,
    rnumbers
  };
};
