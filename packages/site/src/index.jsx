import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";
import "semantic-ui-css/semantic.min.css";
import "@osn/common-ui/reset.css";
import "react-mde/lib/styles/css/react-mde-all.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
