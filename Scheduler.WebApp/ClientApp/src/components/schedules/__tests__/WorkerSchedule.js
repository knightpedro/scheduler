import React from "react";
import { render, screen } from "../../../utils/testing";
import WorkerSchedule from "../WorkerSchedule";

describe("<WorkerSchedule />", () => {
  it("Displays a heading", () => {
    render(<WorkerSchedule />);
    expect(screen.getByText("Staff Schedule"));
  });
});
