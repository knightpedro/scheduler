import React from "react";
import { render, screen } from "../../../utils/testing";
import ReportsPage from "../ReportsPage";

describe("<ReportsPage />", () => {
  it("Displays a heading", () => {
    render(<ReportsPage />);
    expect(screen.getByText("Reports"));
  });
});
