import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import JobTaskDetail from "./jobTaskDetail";
import CreateJobTaskForm from "./createJobTaskForm";
import EditJobTaskForm from "./editJobTaskForm";
import Routes from "../../routes";

const JobTaskRoutes = () => {
    let { CREATE, DETAIL, EDIT } = Routes.jobTasks;
    return (
        <Switch>
            <Route path={CREATE} component={CreateJobTaskForm} />
            <Route path={EDIT} component={EditJobTaskForm} />
            <Route path={DETAIL} component={JobTaskDetail} />
            <Redirect to={Routes.home} />
        </Switch>
    );
};

export default JobTaskRoutes;
