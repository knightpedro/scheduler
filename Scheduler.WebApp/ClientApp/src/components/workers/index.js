import React from "react";
import { Route, Switch } from "react-router-dom";
import WorkersPage from "./WorkersPage";

const Workers = () => (
  <Switch>
    <Route component={WorkersPage} />
  </Switch>
);

export default Workers;
