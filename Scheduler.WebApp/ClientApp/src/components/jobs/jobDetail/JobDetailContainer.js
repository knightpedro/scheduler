import React from "react";
import { Loading, LoadingFailure } from "../../common/loading";
import JobDetail from "./JobDetail";
import { Link } from "react-router-dom";
import Breadcrumb from "../../common/breadcrumb";
import Container from "../../common/containers";
import Routes from "../../../routes";
import { jobsService } from "../../../services";

class JobDetailContainer extends React.Component {
    state = {
        loading: true,
        error: null,
        job: null,
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        jobsService
            .getById(id)
            .then(job =>
                this.setState({
                    job,
                    loading: false,
                })
            )
            .catch(error =>
                this.setState({
                    error,
                    loading: false,
                })
            );
    }

    handleDelete = () => {
        const id = this.state.job.id;
        jobsService
            .destroy(id)
            .then(() => this.props.history.push(Routes.jobs.LIST))
            .catch(error => this.setState({ error }));
    };

    renderBreadcrumb = job => (
        <Breadcrumb>
            <Link className="breadcrumb-item" to={Routes.jobs.LIST}>
                Jobs
            </Link>
            <Breadcrumb.Item active>{job.jobNumber}</Breadcrumb.Item>
        </Breadcrumb>
    );

    renderComponent(component) {
        return <Container>{component}</Container>;
    }

    render() {
        const { loading, error, job } = this.state;
        if (loading) return this.renderComponent(<Loading />);
        if (error)
            return this.renderComponent(
                <LoadingFailure message={error.message} />
            );
        return this.renderComponent(
            <>
                {this.renderBreadcrumb(job)}
                <JobDetail job={job} handleDelete={this.handleDelete} />
            </>
        );
    }
}

export default JobDetailContainer;
