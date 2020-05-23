import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "../../routes";
import ResourceSchedule from "./ResourceSchedule";
import WorkerSchedule from "./WorkerSchedule";

const Schedules = () => (
  <Switch>
    <Route path={routes.schedules.resources} component={ResourceSchedule} />
    <Route component={WorkerSchedule} />
  </Switch>
);

export default Schedules;
