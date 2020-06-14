import React, { useState } from "react";
import { Grid, Input } from "semantic-ui-react";
import JobsList from "./JobsList";
import JobDetail from "./JobDetail";
import { generatePath, useHistory, useParams } from "react-router-dom";
import routes from "../../routes";

const JobDetailPage = () => {
  const [filter, setFilter] = useState();
  const history = useHistory();
  const { id } = useParams();
  const jobId = parseInt(id);

  const handleJobClick = (id) => {
    const path = generatePath(routes.jobs.detail, { id });
    history.push(path);
  };

  return (
    <Grid stackable padded relaxed="very">
      <Grid.Row>
        <Grid.Column width={4}>
          <Input
            fluid
            icon="search"
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
          <JobDetail id={jobId} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default JobDetailPage;