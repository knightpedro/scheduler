import React from "react";
import { Tab, Grid } from "semantic-ui-react";
import WorkerTasksView from "./WorkerTasksView";
import WorkerLeaveView from "./WorkerLeaveView";
import WorkerTrainingView from "./WorkerTrainingView";

const WorkerEventsView = ({ id }) => {
  const panes = [
    {
      menuItem: "Tasks",
      pane: (
        <Tab.Pane key="tasks" as={Grid} padded="vertically">
          <Grid.Row columns="equal">
            <Grid.Column>
              <WorkerTasksView id={id} />
            </Grid.Column>
          </Grid.Row>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Leave",
      pane: (
        <Tab.Pane key="leave" as={Grid} padded="vertically">
          <Grid.Row columns="equal">
            <Grid.Column>
              <WorkerLeaveView id={id} />
            </Grid.Column>
          </Grid.Row>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Training",
      pane: (
        <Tab.Pane key="training" as={Grid} padded="vertically">
          <Grid.Row columns="equal">
            <Grid.Column>
              <WorkerTrainingView id={id} />
            </Grid.Column>
          </Grid.Row>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Tab
      menu={{ secondary: true, pointing: true }}
      panes={panes}
      renderActiveOnly={false}
    />
  );
};

export default WorkerEventsView;
