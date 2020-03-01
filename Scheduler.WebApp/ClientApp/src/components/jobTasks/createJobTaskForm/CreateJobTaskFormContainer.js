import React from "react";
import CreateJobTaskForm from "./CreateJobTaskForm";
import { Loading, LoadingFailure } from "../../common/loading";
import Alert from "../../common/alert";
import Container from "../../common/containers";
import Breadcrumb from "../../common/breadcrumb";
import queryString from "query-string";
import { entitiesSelect } from "../../../utils";
import Routes from "../../../routes";
import { Link, generatePath } from "react-router-dom";
import {
    jobTasksService,
    jobsService,
    resourcesService,
    workersService,
} from "../../../services";

class CreateJobTaskFormContainer extends React.Component {
    state = {
        loading: true,
        loadingError: null,
        formError: null,
        job: null,
        workers: null,
        resources: null,
    };

    componentDidMount = () => {
        const jobId = queryString.parse(this.props.location.search).jobid;
        Promise.all([
            jobsService.getById(jobId),
            resourcesService.getAll(),
            workersService.getAll(),
        ])
            .then(([job, resources, workers]) =>
                this.setState({
                    job,
                    resources: entitiesSelect(resources),
                    workers: entitiesSelect(workers),
                })
            )
            .catch(error => this.setState({ loadingError: error }))
            .finally(() => this.setState({ loading: false }));
    };

    handleCancel = () => this.props.history.goBack();

    handleSubmit = async (values, { setSubmitting }) => {
        this.setState({ formError: null });
        const jobId = this.state.job.id;
        const postBody = {
            jobId: jobId,
            description: values.description,
            start: values.start.format(),
            end: values.end.format(),
        };

        try {
            const jobTaskId = await jobTasksService.create(postBody);
            if (values.selectedWorkers) {
                const workersPatch = {
                    add: values.selectedWorkers.map(w => w.value),
                };
                await jobTasksService.patchWorkers(jobTaskId, workersPatch);
            }

            if (values.selectedResources) {
                const resourcesPatch = {
                    add: values.selectedResources.map(r => r.value),
                };
                await jobTasksService.patchResources(jobTaskId, resourcesPatch);
            }
            const jobTaskDetailPath = generatePath(Routes.jobTasks.DETAIL, {
                id: jobTaskId,
            });
            this.props.history.push(jobTaskDetailPath);
        } catch (error) {
            this.setState({ formError: error });
            setSubmitting(false);
        }
    };

    renderBreadcrumb(job) {
        const jobPath = generatePath(Routes.jobs.DETAIL, { id: job.id });
        return (
            <Breadcrumb>
                <Link className="breadcrumb-item" to={Routes.jobs.LIST}>
                    Jobs
                </Link>
                <Link className="breadcrumb-item" to={jobPath}>
                    {job.jobNumber}
                </Link>
                <Breadcrumb.Item active>Create Task</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    renderComponent(component) {
        return (
            <Container>
                <h2>Create Task</h2>
                {component}
            </Container>
        );
    }

    render() {
        const {
            loading,
            loadingError,
            formError,
            job,
            workers,
            resources,
        } = this.state;
        if (loading) return this.renderComponent(<Loading />);
        if (loadingError)
            return this.renderComponent(
                <LoadingFailure message={loadingError.message} />
            );

        return (
            <Container>
                {this.renderBreadcrumb(job)}
                <h2>Create Task</h2>
                {formError && (
                    <Alert variant="danger">{formError.message}</Alert>
                )}
                <CreateJobTaskForm
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                    resources={resources}
                    workers={workers}
                />
            </Container>
        );
    }
}

export default CreateJobTaskFormContainer;
