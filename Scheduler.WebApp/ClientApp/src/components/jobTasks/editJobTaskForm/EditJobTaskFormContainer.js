import React from "react";
import CreateJobTaskForm from "../createJobTaskForm/CreateJobTaskForm";
import { Loading, LoadingFailure } from "../../common/loading";
import Alert from "../../common/alert";
import Container from "../../common/containers";
import Breadcrumb from "../../common/breadcrumb";
import { createPatch, entitiesSelect } from "../../../utils";
import { isEmpty } from "lodash";
import moment from "moment";
import Routes from "../../../routes";
import { Link, generatePath } from "react-router-dom";
import {
    jobTasksService,
    workersService,
    resourcesService,
} from "../../../services";

class EditJobTaskFormContainer extends React.Component {
    state = {
        loading: true,
        loadingError: null,
        formError: null,
        jobTask: null,
        workers: null,
        resources: null,
    };

    componentDidMount = () => {
        const id = this.props.match.params.id;

        Promise.all([
            jobTasksService.getById(id),
            resourcesService.getAll(),
            workersService.getAll(),
        ])
            .then(([jobTask, resources, workers]) =>
                this.setState({
                    jobTask: this.transformJobTask(jobTask),
                    resources: entitiesSelect(resources),
                    workers: entitiesSelect(workers),
                })
            )
            .catch(error => this.setState({ loadingError: error }))
            .finally(() =>
                this.setState({
                    loading: false,
                })
            );
    };

    transformJobTask(task) {
        return {
            ...task,
            start: moment(task.start),
            end: moment(task.end),
            selectedResources: entitiesSelect(task.resources),
            selectedWorkers: entitiesSelect(task.workers),
        };
    }

    handleCancel = () => this.props.history.goBack();

    handleSubmit = async (values, { setSubmitting }) => {
        this.setState({ formError: null });

        const { jobTask } = this.state;

        const jobTaskEdit = {
            id: jobTask.id,
            description: values.description,
            start: values.start.format(),
            end: values.end.format(),
        };

        try {
            await jobTasksService.edit(jobTaskEdit);

            const initialWorkers = jobTask.workers.map(w => w.id);
            const finalWorkers = values.selectedWorkers.map(w => w.value);
            const workersPatch = createPatch(initialWorkers, finalWorkers);
            if (!isEmpty(workersPatch)) {
                await jobTasksService.patchWorkers(jobTask.id, workersPatch);
            }

            const initialResources = jobTask.resources.map(r => r.id);
            const finalResources = values.selectedResources.map(r => r.value);
            const resourcesPatch = createPatch(
                initialResources,
                finalResources
            );
            if (!isEmpty(resourcesPatch)) {
                await jobTasksService.patchResources(
                    jobTask.id,
                    resourcesPatch
                );
            }

            const jobTaskDetailPath = generatePath(Routes.jobTasks.DETAIL, {
                id: jobTask.id,
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
                <Breadcrumb.Item active>Edit Task</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    renderComponent(component) {
        return (
            <Container>
                <h2>Edit Task</h2>
                {component}
            </Container>
        );
    }

    render() {
        const {
            loading,
            loadingError,
            formError,
            jobTask,
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
                {this.renderBreadcrumb(jobTask.job)}
                <h2>Edit Task</h2>
                {formError && (
                    <Alert variant="danger">{formError.message}</Alert>
                )}
                <CreateJobTaskForm
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                    resources={resources}
                    workers={workers}
                    jobTask={jobTask}
                />
            </Container>
        );
    }
}

export default EditJobTaskFormContainer;
