import "bootstrap/dist/css/bootstrap.min.css";
import "react-datetime/css/react-datetime.css";
import "./index.css";

import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app";
import { ThemeProvider } from "styled-components";
import theme from "./theme/sunny";
import { configureAxios } from "./api/configureAxios";

configureAxios();

render(
    <ThemeProvider theme={theme}>
        <Router>
            <App />
        </Router>
    </ThemeProvider>,
    document.getElementById("root")
);
