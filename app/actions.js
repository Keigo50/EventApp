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

export const eventClearState = () => {
  return {
    type: "eventClear_state"
  };
};

export const returnFocused_true = focused => {
  return {
    type: "return_focused_true",
    payload: focused
  };
};

export const returnFocused_false = focused => {
  return {
    type: "return_focused_false",
    payload: focused
  };
};

//Auth
export const change_Course = course => {
  return {
    type: "change_course",
    payload: course
  };
};

export const change_Department = department => {
  return {
    type: "change_department",
    payload: department
  };
};

export const change_FirstName = firstName => {
  return {
    type: "change_firstName",
    payload: firstName
  };
};

export const change_LastName = lastName => {
  return {
    type: "change_lastName",
    payload: lastName
  };
};

export const change_FvEvents = fvEvents => {
  return {
    type: "change_fvEvents",
    payload: fvEvents
  };
};

export const change_MadeEvents = madeEvents => {
  return {
    type: "change_madeEvents",
    payload: madeEvents
  };
};

export const change_Glade = glade => {
  return {
    type: "change_glade",
    payload: glade
  };
};

export const change_Snumber = snumber => {
  return {
    type: "change_snumber",
    payload: snumber
  };
};

export const change_Email = email => {
  return {
    type: "change_email",
    payload: email
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
