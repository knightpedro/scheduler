import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
