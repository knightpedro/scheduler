import React, { useEffect, useState } from "react";
import { Button, Grid, Input } from "semantic-ui-react";
import {
  generatePath,
  useHistory,
  useParams,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import routes from "../../routes";
import { useDispatch, useSelector } from "react-redux";
import { coordinatorsSelectors } from "../../ducks/coordinators";
import { fetchAll } from "../../ducks/sharedActions";
import CoordinatorsList from "./CoordinatorsList";
import CoordinatorDetail from "./CoordinatorDetail";
import { CoordinatorFormContainer } from "../forms/containers";
import { Empty } from "../common";

const CoordinatorsPage = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState();
  const history = useHistory();
  const firstId = useSelector(coordinatorsSelectors.selectIds)[0];
  const coordinatorId = parseInt(useParams().id);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const handleAddClick = () => {
    history.push(routes.coordinators.create);
  };

  const handleFormClose = (id) => {
    if (id) goToCoordinatorDetail(id);
    else history.push(routes.coordinators.base);
  };

  const goToCoordinatorDetail = (id) => {
    const path = generatePath(routes.coordinators.detail, { id });
    history.push(path);
  };

  return (
    <Grid padded relaxed="very" stackable>
      <Grid.Row>
        <Grid.Column width={4}>
          <Input
            action={<Button icon="add" size="small" onClick={handleAddClick} />}
            fluid
            icon="search"
            iconPosition="left"
            placeholder="Search coordinators"
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
          />
          <CoordinatorsList
            activeId={coordinatorId}
            filter={filter}
            handleClick={goToCoordinatorDetail}
          />
        </Grid.Column>
        <Grid.Column width={12}>
          <Switch>
            <Route path={routes.coordinators.create}>
              <CoordinatorFormContainer closeForm={handleFormClose} />
            </Route>
            <Route path={routes.coordinators.detail}>
              <CoordinatorDetail id={coordinatorId} />
            </Route>
            <Route>
              {firstId ? (
                <Redirect
                  to={generatePath(routes.coordinators.detail, { id: firstId })}
                />
              ) : (
                <Empty message="Select coordinator" />
              )}
            </Route>
          </Switch>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CoordinatorsPage;
