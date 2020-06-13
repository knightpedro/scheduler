import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../../ducks/sharedActions";
import { Grid, Input, Header, Button } from "semantic-ui-react";
import { workersSelectors, createWorker } from "../../ducks/workers";
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
import WorkerForm from "../forms/WorkerForm";
import { unwrapResult } from "@reduxjs/toolkit";

const WorkersPage = () => {
  const [filter, setFilter] = useState();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const workers = useSelector((state) =>
    workersSelectors.selectFiltered(state, filter)
  );

  const location = useLocation();
  const activeId = parseInt(location.pathname.split("/").reverse()[0]);
  const firstId = workers.length > 0 ? workers[0].id : undefined;

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const handleAddClick = () => {
    setShowCreateForm(true);
  };

  const handleAddSubmit = (values) => {
    setShowCreateForm(false);
    dispatch(createWorker(values))
      .then(unwrapResult)
      .then(({ id }) => {
        const path = generatePath(routes.workers.detail, { id });
        history.push(path);
      });
  };

  const handleWorkerClick = (id) => {
    const path = generatePath(routes.workers.detail, { id });
    history.push(path);
  };

  return (
    <Grid stackable padded relaxed="very" celled="internally">
      <Grid.Row>
        <Grid.Column width={4}>
          <Grid>
            <Grid.Row columns="equal" verticalAlign="middle">
              <Grid.Column>
                <Header as="h3">Staff</Header>
              </Grid.Column>
              <Grid.Column textAlign="right">
                <Button icon="add" onClick={handleAddClick} />
              </Grid.Column>
            </Grid.Row>
            {showCreateForm && (
              <Grid.Row columns="equal">
                <Grid.Column>
                  <WorkerForm
                    handleCancel={() => setShowCreateForm(false)}
                    handleSubmit={handleAddSubmit}
                  />
                </Grid.Column>
              </Grid.Row>
            )}
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
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <WorkersList
                  activeId={activeId}
                  workers={workers}
                  handleClick={handleWorkerClick}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
