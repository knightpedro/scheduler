import React from "react";
import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "../theme";

const AppProvider = ({ children }) => (
    <ThemeProvider theme={theme}>
        <Router>{children}</Router>
    </ThemeProvider>
);

export const mountWithProvider = component =>
    mount(component, { wrappingComponent: AppProvider });
