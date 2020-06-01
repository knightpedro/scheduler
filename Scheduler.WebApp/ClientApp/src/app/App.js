import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import routes from "../routes";
import AuthorizeRoute from "../components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "../components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "../components/api-authorization/ApiAuthorizationConstants";
import { ErrorMessages, MainMenu, PortalManager } from "../components/common";
import Schedules from "../components/schedules";
import Workers from "../components/workers";
import PageNotFound from "../components/pageNotFound";
import { Grid } from "semantic-ui-react";

function App() {
  return (
    <Router>
      <PortalManager />
      <MainMenu />
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
        <Route
          path={ApplicationPaths.ApiAuthorizationPrefix}
          component={ApiAuthorizationRoutes}
        />
        <AuthorizeRoute path={routes.schedules.base} component={Schedules} />
        <AuthorizeRoute path={routes.workers.list} component={Workers} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
