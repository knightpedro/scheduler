import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../../ducks/sharedActions";
import { Grid, Input, Header, Button } from "semantic-ui-react";
import { workersSelectors } from "../../ducks/workers";
import WorkersList from "./WorkersList";

const WorkersPage = () => {
  const [filter, setFilter] = useState();
  const dispatch = useDispatch();
  const workers = useSelector((state) =>
    workersSelectors.selectFiltered(state, filter)
  );

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <Grid stackable container>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Header as="h2">Staff</Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns="equal">
        <Grid.Column>
          <Input
            fluid
            icon="search"
            placeholder={`Search ${workers.length} records`}
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Grid.Column>
        <Button icon="add" />
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={6}>
          <WorkersList workers={workers} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default WorkersPage;
