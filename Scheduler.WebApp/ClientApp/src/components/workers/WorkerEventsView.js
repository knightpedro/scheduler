import React from "react";
import { Tab } from "semantic-ui-react";
import WorkerTasksView from "./WorkerTasksView";
import WorkerLeaveView from "./WorkerLeaveView";
import WorkerTrainingView from "./WorkerTrainingView";

const WorkerEventsView = ({ id }) => {
  const panes = [
    {
      menuItem: "Tasks",
      pane: (
        <Tab.Pane key="tasks" basic attached={false}>
          <WorkerTasksView id={id} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Leave",
      pane: (
        <Tab.Pane key="leave" basic attached={false}>
          <WorkerLeaveView id={id} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Training",
      pane: (
        <Tab.Pane key="training" basic attached={false}>
          <WorkerTrainingView id={id} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Tab panes={panes} renderActiveOnly={false}></Tab>
    </>
  );
};

export default WorkerEventsView;
