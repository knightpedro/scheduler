import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../../ducks/sharedActions";
import { Grid, Input, Button } from "semantic-ui-react";
import { workersSelectors } from "../../ducks/workers";
import WorkersList from "./WorkersList";
import {
  Route,
  generatePath,
  useHistory,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import routes from "../../routes";
import WorkerDetail from "./WorkerDetail";
import { Empty } from "../common";
import WorkerFormContainer from "../forms/containers/WorkerFormContainer";

const WorkersPage = () => {
  const [filter, setFilter] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();
  const workerId = parseInt(location.pathname.split("/").reverse()[0]);
  const firstId = useSelector(workersSelectors.selectIds)[0];

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const handleAddClick = () => {
    history.push(routes.workers.create);
  };

  const handleFormClose = (id) => {
    if (id) goToWorkerDetail(id);
    else history.push(routes.workers.base);
  };

  const goToWorkerDetail = (id) => {
    const path = generatePath(routes.workers.detail, { id });
    history.push(path);
  };

  return (
    <Grid padded relaxed="very" stackable>
      <Grid.Row>
        <Grid.Column width={4}>
          <Input
            fluid
            action={<Button icon="add" size="small" onClick={handleAddClick} />}
            icon="search"
            iconPosition="left"
            placeholder="Search staff"
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
          />
          <WorkersList
            activeId={workerId}
            filter={filter}
            handleClick={goToWorkerDetail}
          />
        </Grid.Column>
        <Grid.Column width={12}>
          <Switch>
            <Route path={routes.workers.create}>
              <WorkerFormContainer closeForm={handleFormClose} />
            </Route>
            <Route path={routes.workers.detail}>
              <WorkerDetail id={workerId} />
            </Route>
            <Route>
              {firstId ? (
                <Redirect
                  to={generatePath(routes.workers.detail, { id: firstId })}
                />
              ) : (
                <Empty message="Select staff member" />
              )}
            </Route>
          </Switch>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default WorkersPage;
