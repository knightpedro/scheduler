import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../routes";
import { ErrorMessages, MainMenu, PortalManager } from "../components/common";
import Coordinators from "../components/coordinators";
import Jobs from "../components/jobs";
import Resources from "../components/resources";
import Reports from "../components/reports";
import Schedules from "../components/schedules";
import Training from "../components/training";
import Workers from "../components/workers";
import PageNotFound from "../components/pageNotFound";
import { Grid, Divider } from "semantic-ui-react";

const AppRoutes = () => {
  return (
    <>
      <PortalManager />
      <MainMenu />
      <Divider hidden />
      <Grid container>
        <Grid.Row columns="equal">
          <Grid.Column>
            <ErrorMessages />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Switch>
        <Route path="/" exact>
          <Redirect to={routes.schedules.base} />
        </Route>
        <Route path={routes.coordinators.list} component={Coordinators} />
        <Route path={routes.jobs.list} component={Jobs} />
        <Route path={routes.reports} component={Reports} />
        <Route path={routes.resources.list} component={Resources} />
        <Route path={routes.schedules.base} component={Schedules} />
        <Route path={routes.training.list} component={Training} />
        <Route path={routes.workers.list} component={Workers} />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
};

export default AppRoutes;
