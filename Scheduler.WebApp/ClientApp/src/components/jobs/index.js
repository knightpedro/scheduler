import React, { useEffect } from "react";
import JobsPage from "./JobsPage";
import JobsTablePage from "./JobsTablePage";
import { Switch, Route } from "react-router-dom";
import routes from "../../routes";
import { useDispatch } from "react-redux";
import { fetchAll } from "../../ducks/sharedActions";

const Jobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <Switch>
      <Route path={routes.jobs.table} component={JobsTablePage} />
      <Route component={JobsPage} />
    </Switch>
  );
};

export default Jobs;
