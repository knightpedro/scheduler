import React, { useState } from "react";
import { Grid, Input, Button } from "semantic-ui-react";
import JobsList from "./JobsList";
import JobDetail from "./JobDetail";
import {
  generatePath,
  useHistory,
  useParams,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import routes from "../../routes";
import JobFormContainer from "../forms/containers/JobFormContainer";
import { useSelector } from "react-redux";
import { jobsSelectors } from "../../ducks/jobs";
import { Empty } from "../common";

const JobsPage = () => {
  const [filter, setFilter] = useState();
  const history = useHistory();
  const jobId = parseInt(useParams().id);
  const allIds = useSelector(jobsSelectors.selectIds);
  const firstId = allIds ? allIds[0] : undefined;

  const handleAddClick = () => {
    history.push(routes.jobs.create);
  };

  const handleJobClick = (id) => {
    goToJobDetail(id);
  };

  const handleFormClose = (id) => {
    if (id) goToJobDetail(id);
    else history.push(routes.jobs.base);
  };

  const goToJobDetail = (id) => {
    const path = generatePath(routes.jobs.detail, { id });
    history.push(path);
  };

  return (
    <Grid stackable padded relaxed="very">
      <Grid.Row>
        <Grid.Column width={4}>
          <Input
            action={<Button icon="add" size="small" onClick={handleAddClick} />}
            fluid
            icon="search"
            iconPosition="left"
            placeholder="Search jobs"
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
          />
          <JobsList
            activeId={jobId}
            handleClick={handleJobClick}
            filter={filter}
          />
        </Grid.Column>
        <Grid.Column width={12}>
          <Switch>
            <Route path={routes.jobs.create}>
              <JobFormContainer closeForm={handleFormClose} />
            </Route>
            <Route path={routes.jobs.detail}>
              <JobDetail id={jobId} />
            </Route>
            <Route>
              {firstId ? (
                <Redirect
                  to={generatePath(routes.jobs.detail, { id: firstId })}
                />
              ) : (
                <Empty basic message="Select job" />
              )}
            </Route>
          </Switch>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default JobsPage;
