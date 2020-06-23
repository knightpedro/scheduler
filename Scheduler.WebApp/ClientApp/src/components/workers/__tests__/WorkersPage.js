import React from "react";
import { render, screen } from "../../../utils/testing";
import WorkersPage from "../WorkersPage";

describe("<WorkersPage />", () => {
  it("Displays a heading", () => {
    render(<WorkersPage />);
    expect(screen.getByText("Staff"));
  });
});
