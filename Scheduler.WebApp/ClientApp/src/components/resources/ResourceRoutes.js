import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateResourceForm from "./createResourceForm";
import EditResourceForm from "./editResourceForm";
import ResourcesList from "./resourcesList";
import ResourceDetail from "./resourceDetail";
import ResourcesSchedule from "./resourcesSchedule";
import Routes from "../../routes";

const ResourceRoutes = () => {
    const { CREATE, DETAIL, EDIT, LIST, SCHEDULE } = Routes.resources;
    return (
        <Switch>
            <Route path={CREATE} component={CreateResourceForm} />
            <Route path={EDIT} component={EditResourceForm} />
            <Route path={SCHEDULE} component={ResourcesSchedule} />
            <Route path={DETAIL} component={ResourceDetail} />
            <Route path={LIST} component={ResourcesList} />
        </Switch>
    );
};
export default ResourceRoutes;
