import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../components/common/header";
import Home from "../components/home";
import Reports from "../components/reports";
import About from "../components/about";
import PageNotFound from "../components/pageNotFound";
import CoordinatorRoutes from "../components/coordinators";
import JobRoutes from "../components/jobs";
import JobTaskRoutes from "../components/jobTasks";
import ResourceRoutes from "../components/resources";
import OutOfServiceRoutes from "../components/outOfServices";
import WorkerRoutes from "../components/workers";
import LeaveRoutes from "../components/leave";
import TrainingRoutes from "../components/training";
import Footer from "../components/common/footer";
import Routes from "../routes";
import AuthorizeRoute from "../components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "../components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "../components/api-authorization/ApiAuthorizationConstants";

function App() {
    return (
        <>
            <Header />
            <Switch>
                <AuthorizeRoute exact path={Routes.home} component={Home} />
                <Route
                    path={ApplicationPaths.ApiAuthorizationPrefix}
                    component={ApiAuthorizationRoutes}
                />
                <AuthorizeRoute path={Routes.reports} component={Reports} />
                <Route path={Routes.about} component={About} />
                <AuthorizeRoute
                    path={Routes.coordinators.LIST}
                    component={CoordinatorRoutes}
                />
                <AuthorizeRoute path={Routes.jobs.LIST} component={JobRoutes} />
                <AuthorizeRoute
                    path={Routes.jobTasks.LIST}
                    component={JobTaskRoutes}
                />
                <AuthorizeRoute
                    path={Routes.resources.LIST}
                    component={ResourceRoutes}
                />
                <AuthorizeRoute
                    path={Routes.workers.LIST}
                    component={WorkerRoutes}
                />
                <AuthorizeRoute
                    path={Routes.leave.LIST}
                    component={LeaveRoutes}
                />
                <AuthorizeRoute
                    path={Routes.outOfServices.LIST}
                    component={OutOfServiceRoutes}
                />
                <AuthorizeRoute
                    path={Routes.training.LIST}
                    component={TrainingRoutes}
                />
                <Route component={PageNotFound} />
            </Switch>
            <Footer />
        </>
    );
}

export default App;
