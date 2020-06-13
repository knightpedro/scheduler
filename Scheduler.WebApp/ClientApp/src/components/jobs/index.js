import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../../routes";
import JobDetailPage from "./JobDetailPage";
import JobsPage from "./JobsPage";

const Jobs = () => (
  <Switch>
    <Route path={routes.jobs.detail} component={JobDetailPage} />
    <Route component={JobsPage} />
  </Switch>
);

export default Jobs;
