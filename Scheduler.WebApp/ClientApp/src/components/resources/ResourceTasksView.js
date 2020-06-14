import React from "react";
import { useSelector } from "react-redux";
import { Empty } from "../common";
import { JobTasksTable } from "../jobTasks";
import { useHistory, generatePath } from "react-router-dom";
import routes from "../../routes";
import { resourceJobTaskSelectors } from "../../ducks/jobTasks";
import queryString from "query-string";

const ResourceTasksView = ({ id }) => {
  const history = useHistory();
  const jobTasks = useSelector((state) =>
    resourceJobTaskSelectors.selectJobTasksForResource(state, id)
  );

  const handleJobTaskClick = ({ id, jobId }) => {
    const path = generatePath(routes.jobs.detail, { id: jobId });
    const url = queryString.stringifyUrl({ url: path, query: { task: id } });
    history.push(url);
  };

  return (
    <>
      {jobTasks && jobTasks.length > 0 ? (
        <JobTasksTable jobTasks={jobTasks} handleClick={handleJobTaskClick} />
      ) : (
        <Empty message="No tasks found" />
      )}
    </>
  );
};

export default ResourceTasksView;
