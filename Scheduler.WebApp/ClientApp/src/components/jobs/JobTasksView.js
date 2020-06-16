import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jobTaskSelectors } from "../../ducks/jobTasks";
import { Empty } from "../common";
import { JobTasksTable } from "../jobTasks";
import { jobsSelectors } from "../../ducks/jobs";
import { Grid, Button, Header } from "semantic-ui-react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { JobTaskFormContainer } from "../forms/containers";

const JobTasksView = ({ jobId }) => {
  const [selectedTask, setSelectedTask] = useState();
  const [showForm, setShowForm] = useState(false);
  const job = useSelector((state) => jobsSelectors.selectById(state, jobId));
  const jobTasks = useSelector((state) =>
    jobTaskSelectors.selectByJob(state, jobId)
  );

  useEffect(() => {
    handleCloseForm();
  }, [jobId]);

  const search = useLocation().search;
  const taskId = queryString.parse(search, { parseNumbers: true })["task"];

  useEffect(() => {
    if (taskId) {
      handleTaskClick({ id: taskId });
    }
  }, [taskId]);

  const handleAddClick = () => {
    setSelectedTask();
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedTask();
  };

  const handleTaskClick = ({ id }) => {
    setSelectedTask(id);
    setShowForm(true);
  };

  return (
    <Grid>
      <Grid.Row columns="equal" verticalAlign="middle">
        <Grid.Column>
          <Header>Tasks</Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button
            floated="right"
            color="teal"
            content="Add"
            disabled={job.isComplete}
            onClick={handleAddClick}
          />
        </Grid.Column>
      </Grid.Row>

      {showForm && (
        <Grid.Row>
          <Grid.Column>
            <JobTaskFormContainer
              id={selectedTask}
              jobId={jobId}
              closeForm={handleCloseForm}
              showDelete
              showJobLink={false}
            />
          </Grid.Column>
        </Grid.Row>
      )}

      <Grid.Row columns="equal">
        <Grid.Column>
          {jobTasks && jobTasks.length > 0 ? (
            <JobTasksTable jobTasks={jobTasks} handleClick={handleTaskClick} />
          ) : (
            <Empty message="No tasks found" />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default JobTasksView;
