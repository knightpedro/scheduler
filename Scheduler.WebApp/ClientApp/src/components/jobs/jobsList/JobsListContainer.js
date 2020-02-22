import React from "react";
import { Loading, LoadingFailure } from "../../common/loading";
import { jobsService } from "../../../services";
import Container from "../../common/containers";
import JobsList from "./JobsList";
import { Create } from "../../common/actions";
import Routes from "../../../routes";

class JobsListContainer extends React.Component {
    state = {
        loading: true,
        error: null,
        jobs: null,
    };

    componentDidMount() {
        jobsService
            .getAll()
            .then(jobs =>
                this.setState({
                    jobs,
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

    renderComponent(component) {
        return (
            <Container>
                <h2>Manage Jobs</h2>
                {component}
            </Container>
        );
    }

    render() {
        const { loading, error, jobs } = this.state;
        if (loading) return this.renderComponent(<Loading />);
        if (error)
            return this.renderComponent(
                <LoadingFailure message={error.message} />
            );

        return this.renderComponent(
            <>
                <Create path={Routes.jobs.CREATE}>Job</Create>
                <JobsList jobs={jobs} />
            </>
        );
    }
}

export default JobsListContainer;
