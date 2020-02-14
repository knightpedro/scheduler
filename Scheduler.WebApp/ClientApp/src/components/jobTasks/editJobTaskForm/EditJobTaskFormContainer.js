import React from "react";
import CreateJobTaskForm from "../createJobTaskForm/CreateJobTaskForm";
import { Loading, LoadingFailure } from "../../common/loading";
import axios from "axios";
import {
    JOBS_URL,
    JOBTASKS_URL,
    RESOURCES_URL,
    WORKERS_URL,
} from "../../../api";
import Alert from "react-bootstrap/Alert";
import Container from "../../common/containers";
import Breadcrumb from "../../common/breadcrumb";
import { createPatch, entitiesSelect } from "../../../utils";
import { isEmpty } from "lodash";
import moment from "moment";
import Routes from "../../../routes";
import { generatePath } from "react-router-dom";

class EditJobTaskFormContainer extends React.Component {
    state = {
        loading: true,
        loadingError: null,
        formError: null,
        job: null,
        jobTask: null,
        workers: null,
        resources: null,
    };

    componentDidMount = async () => {
        const id = this.props.match.params.id;
        try {
            let jobTaskRes = await axios.get(`${JOBTASKS_URL}/${id}`);
            const jobTask = this.transformJobTask(jobTaskRes.data);
            let jobRes = await axios.get(`${JOBS_URL}/${jobTask.jobId}`);
            let workersRes = await axios.get(WORKERS_URL);
            let resourcesRes = await axios.get(RESOURCES_URL);
            this.setState({
                loading: false,
                job: jobRes.data,
                jobTask,
                workers: entitiesSelect(workersRes.data.workers),
                resources: entitiesSelect(resourcesRes.data.resources),
            });
        } catch (error) {
            this.setState({
                loading: false,
                loadingError: error,
            });
        }
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

        const putBody = {
            id: jobTask.id,
            description: values.description,
            start: values.start.format(),
            end: values.end.format(),
        };

        try {
            await axios.put(`${JOBTASKS_URL}/${jobTask.id}`, putBody);

            const initialWorkers = jobTask.workers.map(w => w.id);
            const finalWorkers = values.selectedWorkers.map(w => w.value);
            const workersPatch = createPatch(initialWorkers, finalWorkers);
            if (!isEmpty(workersPatch)) {
                await axios.patch(
                    `${JOBTASKS_URL}/${jobTask.id}/workers`,
                    workersPatch
                );
            }

            const initialResources = jobTask.resources.map(r => r.id);
            const finalResources = values.selectedResources.map(r => r.value);
            const resourcesPatch = createPatch(
                initialResources,
                finalResources
            );
            if (!isEmpty(resourcesPatch)) {
                await axios.patch(
                    `${JOBTASKS_URL}/${jobTask.id}/resources`,
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
                <Breadcrumb.Item href={Routes.jobs.LIST}>Jobs</Breadcrumb.Item>
                <Breadcrumb.Item href={jobPath}>
                    {job.jobNumber}
                </Breadcrumb.Item>
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
            job,
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
                {this.renderBreadcrumb(job)}
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
