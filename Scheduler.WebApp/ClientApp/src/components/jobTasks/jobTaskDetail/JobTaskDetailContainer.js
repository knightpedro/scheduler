import React from "react";
import JobTaskDetail from "./JobTaskDetail";
import { Loading, LoadingFailure } from "../../common/loading";
import Breadcrumb from "../../common/breadcrumb";
import Container from "../../common/containers";
import moment from "moment";
import { sortByName } from "../../../utils";
import Routes from "../../../routes";
import { Link, generatePath } from "react-router-dom";
import { jobTasksService } from "../../../services";

const DATE_FORMAT = "h:mma dddd Do MMMM YYYY";

class JobTaskDetailContainer extends React.Component {
    state = {
        loading: true,
        error: null,
        jobTask: null,
    };

    componentDidMount = async () => {
        const id = this.props.match.params.id;
        jobTasksService
            .getById(id)
            .then(task =>
                this.setState({
                    jobTask: {
                        ...task,
                        workers: task.workers.sort(sortByName),
                        resources: task.resources.sort(sortByName),
                        start: moment(task.start).format(DATE_FORMAT),
                        end: moment(task.end).format(DATE_FORMAT),
                    },
                })
            )
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    };

    handleDelete = () => {
        const { jobTask } = this.state;
        const jobPath = generatePath(Routes.jobs.DETAIL, {
            id: jobTask.job.id,
        });
        jobTasksService
            .destroy(jobTask.id)
            .then(() => this.props.history.push(jobPath))
            .catch(error => this.setState({ error }));
    };

    renderBreadcrumb(jobTask) {
        const jobPath = generatePath(Routes.jobs.DETAIL, {
            id: jobTask.job.id,
        });
        return (
            <Breadcrumb>
                <Link className="breadcrumb-item" to={Routes.jobs.LIST}>
                    Jobs
                </Link>
                <Link className="breadcrumb-item" to={jobPath}>
                    {jobTask.job.jobNumber}
                </Link>
                <Breadcrumb.Item active>{jobTask.description}</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    renderComponent(component) {
        return <Container>{component}</Container>;
    }

    render() {
        const { loading, error, jobTask } = this.state;
        if (loading) return this.renderComponent(<Loading />);
        if (error)
            return this.renderComponent(
                <LoadingFailure message={error.message} />
            );

        return this.renderComponent(
            <>
                {this.renderBreadcrumb(jobTask)}
                <JobTaskDetail
                    jobTask={jobTask}
                    handleDelete={this.handleDelete}
                />
            </>
        );
    }
}

export default JobTaskDetailContainer;
