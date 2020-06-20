import React, { useState, useEffect } from "react";
import {
  useLocation,
  generatePath,
  useHistory,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Input, Button } from "semantic-ui-react";
import routes from "../../routes";
import TrainingDetail from "./TrainingDetail";
import TrainingList from "./TrainingList";
import { Empty } from "../common";
import { fetchAll } from "../../ducks/sharedActions";
import { TrainingFormContainer } from "../forms/containers";
import { trainingSelectors } from "../../ducks/training";

const TrainingPage = () => {
  const [filter, setFilter] = useState();
  const history = useHistory();
  const location = useLocation();
  const trainingId = parseInt(location.pathname.split("/").reverse()[0]);
  const firstId = useSelector(trainingSelectors.selectIds)[0];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const handleAddClick = () => {
    history.push(routes.training.create);
  };

  const handleFormClose = (id) => {
    if (id) goToTrainingDetail(id);
    else history.push(routes.training.base);
  };

  const goToTrainingDetail = (id) => {
    const path = generatePath(routes.training.detail, { id });
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
            placeholder="Search training"
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
          />
          <TrainingList
            activeId={trainingId}
            filter={filter}
            handleClick={goToTrainingDetail}
          />
        </Grid.Column>
        <Grid.Column width={12}>
          <Switch>
            <Route path={routes.training.create}>
              <TrainingFormContainer closeForm={handleFormClose} />
            </Route>
            <Route path={routes.training.detail}>
              <TrainingDetail id={trainingId} />
            </Route>
            <Route>
              {firstId ? (
                <Redirect
                  to={generatePath(routes.training.detail, { id: firstId })}
                />
              ) : (
                <Empty basic message="Select training" />
              )}
            </Route>
          </Switch>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default TrainingPage;
