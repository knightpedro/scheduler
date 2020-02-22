import React from "react";
import { Loading, LoadingFailure } from "../../common/loading";
import Alert from "../../common/alert";
import Container from "../../common/containers";
import Breadcrumb from "../../common/breadcrumb";
import CreateJobForm from "./CreateJobForm";
import { Link, generatePath } from "react-router-dom";
import Routes from "../../../routes";
import { coordinatorsService, jobsService } from "../../../services";

class CreateJobContainer extends React.Component {
    state = {
        loading: true,
        loadingError: null,
        formError: null,
        coordinators: null,
    };

    componentDidMount() {
        coordinatorsService
            .getAll()
            .then(coordinators =>
                this.setState({
                    coordinators: this.transformCoordinatorsForSelection(
                        coordinators
                    ),
                })
            )
            .catch(error =>
                this.setState({
                    loadingError: error,
                })
            )
            .finally(() => this.setState({ loading: false }));
    }

    transformCoordinatorsForSelection(coordinators) {
        const sorted = coordinators.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        return sorted.map(c => ({ label: c.name, value: c.id }));
    }

    handleCancel = () => this.props.history.goBack();

    handleSubmit = async (values, { setSubmitting }) => {
        this.setState({ formError: null });

        const jobBody = {
            ...values,
            dateReceived: values.dateReceived.format(),
            coordinatorId: values.coordinator.value,
        };

        jobsService
            .create(jobBody)
            .then(id => {
                const detailPath = generatePath(Routes.jobs.DETAIL, {
                    id,
                });
                this.props.history.push(detailPath);
            })
            .catch(error => {
                this.setState({ formError: error });
                setSubmitting(false);
            });
    };

    renderBreadcrumb = () => (
        <Breadcrumb>
            <Link className="breadcrumb-item" to={Routes.jobs.LIST}>
                Jobs
            </Link>
            <Breadcrumb.Item active>Create</Breadcrumb.Item>
        </Breadcrumb>
    );

    renderComponent(component) {
        return (
            <Container>
                {this.renderBreadcrumb()}
                <h2>Create Job</h2>
                {component}
            </Container>
        );
    }

    render() {
        const { loading, loadingError, formError, coordinators } = this.state;
        if (loading) return this.renderComponent(<Loading />);
        if (loadingError)
            return this.renderComponent(
                <LoadingFailure message={loadingError.message} />
            );

        return this.renderComponent(
            <>
                {formError && (
                    <Alert variant="danger">{formError.message}</Alert>
                )}
                <CreateJobForm
                    coordinators={coordinators}
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                />
            </>
        );
    }
}

export default CreateJobContainer;
