import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";
import "semantic-ui-css/semantic.min.css";
import "@osn/common-ui/reset.css";
import "react-mde/lib/styles/css/react-mde-all.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
