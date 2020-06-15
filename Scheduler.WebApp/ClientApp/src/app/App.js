import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthorizeRoute from "../components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "../components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "../components/api-authorization/ApiAuthorizationConstants";

import AppRoutes from "./AppRoutes";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path={ApplicationPaths.ApiAuthorizationPrefix}
          component={ApiAuthorizationRoutes}
        />
        <AuthorizeRoute path="/" component={AppRoutes} />
      </Switch>
    </Router>
  );
}

export default App;
