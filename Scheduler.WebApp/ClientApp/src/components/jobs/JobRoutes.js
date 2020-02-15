import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateJobForm from "./createJobForm";
import EditJobForm from "./editJobForm";
import JobDetail from "./jobDetail";
import JobsList from "./jobsList";
import Routes from "../../routes";

const JobRoutes = () => {
    let { CREATE, DETAIL, EDIT, LIST } = Routes.jobs;
    return (
        <Switch>
            <Route path={CREATE} component={CreateJobForm} />
            <Route path={EDIT} component={EditJobForm} />
            <Route path={DETAIL} component={JobDetail} />
            <Route path={LIST} component={JobsList} />
        </Switch>
    );
};

export default JobRoutes;
