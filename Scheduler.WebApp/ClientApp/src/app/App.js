import React from "react";
import { Route, Switch } from "react-router-dom";
import Routes from "../routes";
import AuthorizeRoute from "../components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "../components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "../components/api-authorization/ApiAuthorizationConstants";
import PageNotFound from "../components/pageNotFound";

function App() {
  return (
    <>
      <Switch>
        <Route
          path={ApplicationPaths.ApiAuthorizationPrefix}
          component={ApiAuthorizationRoutes}
        />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
