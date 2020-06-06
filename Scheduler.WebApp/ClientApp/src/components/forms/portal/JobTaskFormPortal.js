import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePortal } from "../../../ducks/portal";
import JobTaskForm from "../JobTaskForm";
import { selectJobTaskWithEntities } from "../../../ducks/globalSelectors";
import { workersSelectors } from "../../../ducks/workers";
import { resourceSelectors } from "../../../ducks/resources";
import { Header } from "semantic-ui-react";
import { createJobTask, updateJobTask } from "../../../ducks/jobTasks";

const JobTaskFormPortal = ({ id, ...props }) => {
  const dispatch = useDispatch();
  const jobTask = useSelector((state) => selectJobTaskWithEntities(state, id));
  const workers = useSelector(workersSelectors.selectAll);
  const resources = useSelector(resourceSelectors.selectAll);

  const workerOptions = workers.map((w) => ({ text: w.name, value: w.id }));
  const resourceOptions = resources.map((r) => ({ text: r.name, value: r.id }));

  const handleCancel = () => {
    dispatch(closePortal());
  };

  const handleSubmit = (values) => {
    dispatch(closePortal());

    if (id) {
      dispatch(updateJobTask(values));
    } else {
      dispatch(createJobTask(values));
    }
  };

  return (
    <>
      <Header>{id ? "Edit " : "Create "} Task</Header>
      <JobTaskForm
        values={jobTask}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        resourceOptions={resourceOptions}
        workerOptions={workerOptions}
        {...props}
      />
    </>
  );
};

export default JobTaskFormPortal;
