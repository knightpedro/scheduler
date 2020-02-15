import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CreateOutOfServiceForm from "./createOutOfServiceForm";
import EditOutOfServiceForm from "./editOutOfServiceForm";
import Routes from "../../routes";

const OutOfServiceRoutes = () => {
    return (
        <Switch>
            <Route
                path={Routes.outOfServices.CREATE}
                component={CreateOutOfServiceForm}
            />
            <Route
                path={Routes.outOfServices.EDIT}
                component={EditOutOfServiceForm}
            />
            <Redirect to={Routes.home} />
        </Switch>
    );
};

export default OutOfServiceRoutes;
