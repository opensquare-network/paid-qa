import { combineReducers } from "@reduxjs/toolkit";

import accountReducer from "./accountSlice";
import showConnectReducer from "./showConnectSlice";

export default combineReducers({
  account: accountReducer,
  showConnect: showConnectReducer,
});
