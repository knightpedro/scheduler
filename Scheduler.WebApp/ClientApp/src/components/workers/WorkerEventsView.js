import React from "react";
import { useSelector } from "react-redux";
import { leaveSelectors } from "../../ducks/leave";
import { workerTrainingSelectors } from "../../ducks/training";
import { workerJobTaskSelectors } from "../../ducks/jobTasks";
import { Tab, Grid } from "semantic-ui-react";
import { JobTasksTable } from "../jobTasks";

const WorkerEventsView = ({ id }) => {
  const jobTasks = useSelector((state) =>
    workerJobTaskSelectors.selectJobTasksForWorker(state, id)
  );
  const leave = useSelector((state) =>
    leaveSelectors.selectByWorker(state, id)
  );
  const training = useSelector((state) =>
    workerTrainingSelectors.selectTrainingForWorker(state, id)
  );

  const panes = [
    {
      menuItem: "Tasks",
      pane: (
        <Tab.Pane key="tasks" basic attached={false}>
          <JobTasksTable jobTasks={jobTasks} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Leave",
      pane: <Tab.Pane key="leave" basic attached={false}></Tab.Pane>,
    },
    {
      menuItem: "Training",
      pane: <Tab.Pane key="training" basic attached={false}></Tab.Pane>,
    },
  ];

  return (
    <>
      <Tab panes={panes} renderActiveOnly={false}></Tab>
    </>
  );
};

export default WorkerEventsView;
