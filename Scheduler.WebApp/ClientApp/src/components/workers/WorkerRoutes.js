import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateWorkerForm from "./createWorkerForm";
import EditWorkerForm from "./editWorkerForm";
import WorkerDetail from "./workerDetail";
import WorkersList from "./workersList";
import WorkersSchedule from "./workersSchedule";
import Routes from "../../routes";

const WorkerRoutes = () => {
    const { CREATE, DETAIL, EDIT, LIST, SCHEDULE } = Routes.workers;
    return (
        <Switch>
            <Route path={CREATE} component={CreateWorkerForm} />
            <Route path={EDIT} component={EditWorkerForm} />
            <Route path={SCHEDULE} component={WorkersSchedule} />
            <Route path={DETAIL} component={WorkerDetail} />
            <Route path={LIST} component={WorkersList} />
        </Switch>
    );
};

export default WorkerRoutes;
