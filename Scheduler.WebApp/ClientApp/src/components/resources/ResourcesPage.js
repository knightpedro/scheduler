import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../../ducks/sharedActions";
import { Grid, Input, Button, Header } from "semantic-ui-react";
import { resourcesSelectors } from "../../ducks/resources";
import routes from "../../routes";
import {
  Route,
  generatePath,
  useHistory,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import { ResourceFormContainer } from "../forms/containers";
import { Empty } from "../common";
import ResourceDetail from "./ResourceDetail";
import ResourcesList from "./ResourcesList";

const ResourcesPage = () => {
  const [filter, setFilter] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();
  const resourceId = parseInt(location.pathname.split("/").reverse()[0]);
  const firstId = useSelector(resourcesSelectors.selectIds)[0];

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const handleAddClick = () => {
    history.push(routes.resources.create);
  };

  const handleFormClose = (id) => {
    if (id) goToResourceDetail(id);
    else history.push(routes.resources.base);
  };

  const goToResourceDetail = (id) => {
    const path = generatePath(routes.resources.detail, { id });
    history.push(path);
  };

  return (
    <Grid padded relaxed="very" stackable>
      <Grid.Row>
        <Grid.Column width={4}>
          <Header as="h1">Plant</Header>
          <Input
            fluid
            action={<Button icon="add" size="small" onClick={handleAddClick} />}
            icon="search"
            iconPosition="left"
            placeholder="Search plant"
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
          />
          <ResourcesList
            activeId={resourceId}
            filter={filter}
            handleClick={goToResourceDetail}
          />
        </Grid.Column>
        <Grid.Column width={12}>
          <Switch>
            <Route path={routes.resources.create}>
              <ResourceFormContainer closeForm={handleFormClose} />
            </Route>
            <Route path={routes.resources.detail}>
              <ResourceDetail id={resourceId} />
            </Route>
            <Route>
              {firstId ? (
                <Redirect
                  to={generatePath(routes.resources.detail, { id: firstId })}
                />
              ) : (
                <Empty basic message="Select plant" />
              )}
            </Route>
          </Switch>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ResourcesPage;
