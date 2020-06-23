import React from "react";
import { render, screen } from "../../../utils/testing";
import ResourcesPage from "../ResourcesPage";

describe("<ResourcesPage />", () => {
  it("Displays a heading", () => {
    render(<ResourcesPage />);
    expect(screen.getByText("Plant"));
  });
});
