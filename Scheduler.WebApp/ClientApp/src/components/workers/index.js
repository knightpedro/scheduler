import React from "react";
import { Route, Switch } from "react-router-dom";
import WorkersList from "./WorkersList";

const Workers = () => (
  <Switch>
    <Route component={WorkersList} />
  </Switch>
);

export default Workers;
