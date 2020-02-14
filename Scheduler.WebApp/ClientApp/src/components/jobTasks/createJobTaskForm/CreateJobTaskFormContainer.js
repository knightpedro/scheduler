import React from "react";
import CreateJobTaskForm from "./CreateJobTaskForm";
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
import queryString from "query-string";
import { entitiesSelect } from "../../../utils";
import Routes from "../../../routes";
import { generatePath } from "react-router-dom";

class CreateJobTaskFormContainer extends React.Component {
    state = {
        loading: true,
        loadingError: null,
        formError: null,
        job: null,
        workers: null,
        resources: null,
    };

    componentDidMount = async () => {
        try {
            const jobId = queryString.parse(this.props.location.search).jobid;
            let jobRes = await axios.get(`${JOBS_URL}/${jobId}`);
            let resourcesRes = await axios.get(RESOURCES_URL);
            let workersRes = await axios.get(WORKERS_URL);
            this.setState({
                loading: false,
                job: jobRes.data,
                resources: entitiesSelect(resourcesRes.data.resources),
                workers: entitiesSelect(workersRes.data.workers),
            });
        } catch (error) {
            this.setState({ loading: false, loadingError: error });
        }
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
            const jobTaskRes = await axios.post(JOBTASKS_URL, postBody);
            const jobTaskId = jobTaskRes.data.id;

            if (values.selectedWorkers) {
                const workersPatch = {
                    add: values.selectedWorkers.map(w => w.value),
                };
                await axios.patch(
                    `${JOBTASKS_URL}/${jobTaskId}/workers`,
                    workersPatch
                );
            }

            if (values.selectedResources) {
                const resourcesPatch = {
                    add: values.selectedResources.map(r => r.value),
                };
                await axios.patch(
                    `${JOBTASKS_URL}/${jobTaskId}/resources`,
                    resourcesPatch
                );
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
                <Breadcrumb.Item href={Routes.jobs.LIST}>Jobs</Breadcrumb.Item>
                <Breadcrumb.Item href={jobPath}>
                    {job.jobNumber}
                </Breadcrumb.Item>
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
