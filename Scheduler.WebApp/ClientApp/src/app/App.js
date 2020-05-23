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
import { MainMenu } from "../components/menus";
import Schedules from "../components/schedules";
import Workers from "../components/workers";
import PageNotFound from "../components/pageNotFound";

function App() {
  return (
    <Router>
      <MainMenu />
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
