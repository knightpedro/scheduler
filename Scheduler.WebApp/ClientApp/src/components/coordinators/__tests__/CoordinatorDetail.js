import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "../../../utils/testing";
import CoordinatorDetail from "../CoordinatorDetail";

const EMPTY_MESSAGE = "Coordinator not found";

const coordinatorStub = {
  id: 1,
  name: "Test Coordinator",
  email: "test.coordinator@scheduler.test",
  isActive: true,
};

const coordinatorState = {
  ids: [coordinatorStub.id],
  entities: {
    [coordinatorStub.id]: coordinatorStub,
  },
};

describe("<CoordinatorDetail />", () => {
  it("Renders empty message when no coordinator found", () => {
    render(<CoordinatorDetail id={15} />);
    expect(screen.getByText(EMPTY_MESSAGE));
  });

  it("Renders empty message when no ID provided", () => {
    render(<CoordinatorDetail />);
    expect(screen.getByText(EMPTY_MESSAGE));
  });

  it("Does not render empty message when coordinator is found", () => {
    render(<CoordinatorDetail id={coordinatorStub.id} />, {
      initialState: { coordinators: coordinatorState },
    });
    expect(screen.queryByText(EMPTY_MESSAGE)).toBeNull();
  });

  it("Shows coordinator's name", () => {
    render(<CoordinatorDetail id={coordinatorStub.id} />, {
      initialState: { coordinators: coordinatorState },
    });
    expect(screen.getByText(coordinatorStub.name));
  });

  it("Shows coordinator's email", () => {
    render(<CoordinatorDetail id={coordinatorStub.id} />, {
      initialState: { coordinators: coordinatorState },
    });
    expect(screen.getByText(coordinatorStub.email));
  });

  it("Doesn't show edit form initially", () => {
    render(<CoordinatorDetail id={coordinatorStub.id} />, {
      initialState: { coordinators: coordinatorState },
    });
    expect(screen.queryByDisplayValue(coordinatorStub.name)).toBeNull();
    expect(screen.queryByDisplayValue(coordinatorStub.email)).toBeNull();
  });

  it("Shows edit form on edit button click", () => {
    render(<CoordinatorDetail id={coordinatorStub.id} />, {
      initialState: { coordinators: coordinatorState },
    });
    fireEvent.click(screen.getByLabelText("Edit"));
    expect(screen.getByDisplayValue(coordinatorStub.name));
    expect(screen.getByDisplayValue(coordinatorStub.email));
  });

  it("Hides edit form on cancel click", () => {
    render(<CoordinatorDetail id={coordinatorStub.id} />, {
      initialState: { coordinators: coordinatorState },
    });
    fireEvent.click(screen.getByLabelText("Edit"));
    expect(screen.getByDisplayValue(coordinatorStub.name));
    expect(screen.getByDisplayValue(coordinatorStub.email));

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByDisplayValue(coordinatorStub.name)).toBeNull();
    expect(screen.queryByDisplayValue(coordinatorStub.email)).toBeNull();
  });

  it("Hides edit form on save", () => {
    render(<CoordinatorDetail id={coordinatorStub.id} />, {
      initialState: { coordinators: coordinatorState },
    });

    fireEvent.click(screen.getByLabelText("Edit"));
    expect(screen.getByDisplayValue(coordinatorStub.name));

    fireEvent.click(screen.getByText("Save coordinator"));
    return waitForElementToBeRemoved(() =>
      screen.getByDisplayValue(coordinatorStub.name)
    );
  });

  it("shows modal on delete click", () => {
    render(<CoordinatorDetail id={coordinatorStub.id} />, {
      initialState: { coordinators: coordinatorState },
    });
    fireEvent.click(screen.getByLabelText("Delete"));
    expect(screen.getByText("Delete Coordinator"));
  });

  it("hides modal on cancellation", () => {
    render(<CoordinatorDetail id={coordinatorStub.id} />, {
      initialState: { coordinators: coordinatorState },
    });
    fireEvent.click(screen.getByLabelText("Delete"));
    expect(screen.getByText("Delete Coordinator"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Delete Coordinator")).toBeNull();
  });

  it("Shows jobs table for coordinator", () => {
    render(<CoordinatorDetail id={coordinatorStub.id} />, {
      initialState: { coordinators: coordinatorState },
    });
    expect(screen.getByText("Jobs"));
    expect(screen.getByText("No jobs found"));
  });
});
