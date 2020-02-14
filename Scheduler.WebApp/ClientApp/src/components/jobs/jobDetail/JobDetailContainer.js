import React from "react";
import axios from "axios";
import { JOBS_URL } from "../../../api";
import { Loading, LoadingFailure } from "../../common/loading";
import JobDetail from "./JobDetail";
import Breadcrumb from "../../common/breadcrumb";
import Container from "../../common/containers";
import Routes from "../../../routes";

class JobDetailContainer extends React.Component {
    state = {
        loading: true,
        error: null,
        job: null,
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        axios
            .get(`${JOBS_URL}/${id}`)
            .then(res =>
                this.setState({
                    job: res.data,
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
        axios
            .delete(`${JOBS_URL}/${id}`)
            .then(() => this.props.history.push(Routes.jobs.LIST))
            .catch(error => this.setState({ error }));
    };

    renderBreadcrumb = job => (
        <Breadcrumb>
            <Breadcrumb.Item href={Routes.jobs.LIST}>Jobs</Breadcrumb.Item>
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
