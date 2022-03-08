import { combineReducers } from "@reduxjs/toolkit";

import accountReducer from "./accountSlice";
import showConnectReducer from "./showConnectSlice";
import nodeReducer from "./nodeSlice";
import topicReducer from "./topicSlice";

export default combineReducers({
  account: accountReducer,
  showConnect: showConnectReducer,
  node: nodeReducer,
  topic: topicReducer,
});
