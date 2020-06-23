import React from "react";
import { render, screen } from "../../../utils/testing";
import JobsPage from "../JobsPage";

describe("<JobsPage />", () => {
  it("Displays a heading", () => {
    render(<JobsPage />);
    expect(screen.getByText("Jobs"));
  });
});
