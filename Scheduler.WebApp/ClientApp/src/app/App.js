import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../components/common/header";
import Home from "../components/home";
import Reports from "../components/reports";
import About from "../components/about";
import PageNotFound from "../components/pageNotFound";
import {
    CoordinatorsList,
    CoordinatorDetail,
    CreateCoordinatorForm,
    EditCoordinatorForm
} from "../components/coordinators";
import {
    CreateJobForm,
    EditJobForm,
    JobDetail,
    JobsList
} from "../components/jobs";
import {
    JobTaskDetail,
    CreateJobTaskForm,
    EditJobTaskForm
} from "../components/jobTasks";
import {
    CreateResourceForm,
    EditResourceForm,
    ResourcesList,
    ResourceDetail,
    ResourcesSchedule
} from "../components/resources";
import {
    CreateOutOfServiceForm,
    EditOutOfServiceForm
} from "../components/outOfServices";
import {
    CreateWorkerForm,
    EditWorkerForm,
    WorkerDetail,
    WorkersList,
    WorkersSchedule
} from "../components/workers";
import { CreateLeaveForm, EditLeaveForm } from "../components/leave";
import {
    CreateTrainingForm,
    EditTrainingForm,
    TrainingList,
    TrainingDetail
} from "../components/training";
import Footer from "../components/common/footer";
import Routes from "../routes";
import AuthorizeRoute from '../components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from '../components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from '../components/api-authorization/ApiAuthorizationConstants';

function App() {
    return (
        <>
            <Header />
            <Switch>
                <AuthorizeRoute exact path={Routes.home} component={Home} />
                <AuthorizeRoute path={Routes.reports} component={Reports} />
                <Route path={Routes.about} component={About} />

                <AuthorizeRoute
                    exact
                    path={Routes.coordinators.LIST}
                    component={CoordinatorsList}
                />
                <AuthorizeRoute
                    path={Routes.coordinators.CREATE}
                    component={CreateCoordinatorForm}
                />
                <AuthorizeRoute
                    path={Routes.coordinators.EDIT}
                    component={EditCoordinatorForm}
                />
                <AuthorizeRoute
                    path={Routes.coordinators.DETAIL}
                    component={CoordinatorDetail}
                />

                <AuthorizeRoute exact path={Routes.jobs.LIST} component={JobsList} />
                <AuthorizeRoute path={Routes.jobs.CREATE} component={CreateJobForm} />
                <AuthorizeRoute path={Routes.jobs.EDIT} component={EditJobForm} />
                <AuthorizeRoute path={Routes.jobs.DETAIL} component={JobDetail} />

                <AuthorizeRoute path={Routes.jobTasks.CREATE} component={CreateJobTaskForm} />
                <AuthorizeRoute path={Routes.jobTasks.EDIT} component={EditJobTaskForm} />
                <AuthorizeRoute path={Routes.jobTasks.DETAIL} component={JobTaskDetail} />

                <AuthorizeRoute exact path={Routes.resources.LIST} component={ResourcesList} />
                <AuthorizeRoute path={Routes.resources.CREATE} component={CreateResourceForm} />
                <AuthorizeRoute path={Routes.resources.EDIT} component={EditResourceForm} />
                <AuthorizeRoute path={Routes.resources.DETAIL} component={ResourceDetail} />

                <AuthorizeRoute
                    path={Routes.outOfServices.CREATE}
                    component={CreateOutOfServiceForm}
                />
                <AuthorizeRoute
                    path={Routes.outOfServices.EDIT}
                    component={EditOutOfServiceForm}
                />

                <AuthorizeRoute exact path={Routes.workers.LIST} component={WorkersList} />
                <AuthorizeRoute path={Routes.workers.CREATE} component={CreateWorkerForm} />
                <AuthorizeRoute path={Routes.workers.EDIT} component={EditWorkerForm} />
                <AuthorizeRoute path={Routes.workers.DETAIL} component={WorkerDetail} />

                <AuthorizeRoute path={Routes.leave.CREATE} component={CreateLeaveForm} />
                <AuthorizeRoute path={Routes.leave.EDIT} component={EditLeaveForm} />

                <AuthorizeRoute exact path={Routes.training.LIST} component={TrainingList} />
                <AuthorizeRoute path={Routes.training.CREATE} component={CreateTrainingForm} />
                <AuthorizeRoute path={Routes.training.EDIT} component={EditTrainingForm} />
                <AuthorizeRoute path={Routes.training.DETAIL} component={TrainingDetail} />

                <AuthorizeRoute path={Routes.schedules.workers} component={WorkersSchedule} />
                <AuthorizeRoute
                    path={Routes.schedules.resources}
                    component={ResourcesSchedule}
                />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
                <Route component={PageNotFound} />
            </Switch>
            <Footer />
        </>
    );
}

export default App;
