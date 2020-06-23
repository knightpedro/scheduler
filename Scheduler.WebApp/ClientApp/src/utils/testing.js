import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reducer from "../ducks";
import { MemoryRouter } from "react-router-dom";

function renderWithProviders(
  ui,
  {
    initialState = {},
    store = configureStore({ reducer, preloadedState: initialState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { renderWithProviders as render };
