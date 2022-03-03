import { combineReducers } from "@reduxjs/toolkit";

import showConnectReducer from "./showConnectSlice";

export default combineReducers({
  showConnect: showConnectReducer,
});
