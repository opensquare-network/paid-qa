import { combineReducers } from "@reduxjs/toolkit";

import accountReducer from "./accountSlice";
import nodeReducer from "./nodeSlice";
import topicReducer from "./topicSlice";
import answerReducer from "./answerSlice";
import toastReducer from "./toastSlice";
import notificationReducer from "./notificationSlice";

export default combineReducers({
  account: accountReducer,
  node: nodeReducer,
  topic: topicReducer,
  answer: answerReducer,
  toast: toastReducer,
  notification: notificationReducer,
});
