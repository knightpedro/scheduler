import React from "react";
import { render } from "react-dom";
import App from "./app";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reducer from "./ducks";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "semantic-ui-css/semantic.min.css";
import "./index.css";

const store = configureStore({ reducer });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
