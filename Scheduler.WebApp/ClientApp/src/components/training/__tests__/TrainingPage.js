import React from "react";
import { render, screen } from "../../../utils/testing";
import TrainingPage from "../TrainingPage";

describe("<TrainingPage />", () => {
  it("Displays a heading", () => {
    render(<TrainingPage />);
    expect(screen.getByText("Training"));
  });
});
