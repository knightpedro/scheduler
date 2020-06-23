import React from "react";
import { render, screen } from "../../../utils/testing";
import CoordinatorsPage from "../CoordinatorsPage";

describe("<CoordinatorsPage />", () => {
  it("shows Coordinators heading", () => {
    render(<CoordinatorsPage />);
    expect(screen.getByText("Coordinators"));
  });

  it("shows empty message when no coordinators found", () => {
    render(<CoordinatorsPage />);
    expect(screen.getByText("No coordinators found"));
  });
});
