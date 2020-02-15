import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CreateLeaveForm from "./createLeaveForm";
import EditLeaveForm from "./editLeaveForm";
import Routes from "../../routes";

const LeaveRoutes = () => {
    return (
        <Switch>
            <Route path={Routes.leave.CREATE} component={CreateLeaveForm} />
            <Route path={Routes.leave.EDIT} component={EditLeaveForm} />
            <Redirect to={Routes.home} />
        </Switch>
    );
};

export default LeaveRoutes;
