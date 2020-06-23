import React from "react";
import { render, screen } from "../../../utils/testing";
import ResourceSchedule from "../ResourceSchedule";

describe("<ResourceSchedule />", () => {
  it("Displays a heading", () => {
    render(<ResourceSchedule />);
    expect(screen.getByText("Plant Schedule"));
  });
});
