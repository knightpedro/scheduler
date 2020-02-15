import React from "react";
import { Route, Switch } from "react-router-dom";
import CoordinatorsList from "./coordinatorsList";
import CoordinatorDetail from "./coordinatorDetail";
import CreateCoordinatorForm from "./createCoordinatorForm";
import EditCoordinatorForm from "./editCoordinatorForm";
import Routes from "../../routes";

const CoordinatorRoutes = () => {
    let { CREATE, DETAIL, EDIT, LIST } = Routes.coordinators;
    return (
        <Switch>
            <Route path={CREATE} component={CreateCoordinatorForm} />
            <Route path={EDIT} component={EditCoordinatorForm} />
            <Route path={DETAIL} component={CoordinatorDetail} />
            <Route path={LIST} component={CoordinatorsList} />
        </Switch>
    );
};

export default CoordinatorRoutes;
