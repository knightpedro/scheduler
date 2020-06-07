import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../../ducks/sharedActions";
import { Grid, Input, Header, Button, Segment } from "semantic-ui-react";
import { workersSelectors } from "../../ducks/workers";
import WorkersList from "./WorkersList";
import {
  Route,
  generatePath,
  useHistory,
  Switch,
  Redirect,
} from "react-router-dom";
import routes from "../../routes";
import WorkerDetail from "./WorkerDetail";

const WorkersPage = () => {
  const [filter, setFilter] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const workers = useSelector((state) =>
    workersSelectors.selectFiltered(state, filter)
  );

  const firstId = workers.length > 0 ? workers[0].id : undefined;

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const handleWorkerClick = (id) => {
    const path = generatePath(routes.workers.detail, { id });
    history.push(path);
  };

  return (
    <Grid stackable padded relaxed="very">
      <Grid.Row columns="equal">
        <Grid.Column>
          <Header as="h2">Staff</Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button content="Add" color="teal" />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={4}>
          <Input
            fluid
            icon="search"
            placeholder={`Search ${workers.length} records`}
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
          />
          <WorkersList workers={workers} handleClick={handleWorkerClick} />
        </Grid.Column>

        <Grid.Column width={12}>
          <Switch>
            <Route path={routes.workers.detail} component={WorkerDetail} />
            <Route>
              {firstId && (
                <Redirect
                  to={generatePath(routes.workers.detail, { id: firstId })}
                />
              )}
            </Route>
          </Switch>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default WorkersPage;
