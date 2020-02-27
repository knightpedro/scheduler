import React from "react";
import Alert from "../../common/alert";
import Container from "../../common/containers";
import Breadcrumb from "../../common/breadcrumb";
import { Loading, LoadingFailure } from "../../common/loading";
import EditJobForm from "./EditJobForm";
import { isEqual } from "lodash";
import moment from "moment";
import { Link, generatePath } from "react-router-dom";
import Routes from "../../../routes";
import { jobsService, coordinatorsService } from "../../../services";

class EditJobFormContainer extends React.Component {
    state = {
        loading: true,
        loadingError: null,
        formError: null,
        job: null,
        coordinators: null,
    };

    componentDidMount = () => {
        const { id } = this.props.match.params;
        Promise.all([coordinatorsService.getAll(), jobsService.getById(id)])
            .then(([coordinators, job]) =>
                this.setState({
                    coordinators: this.transformCoordinatorsForSelection(
                        coordinators
                    ),
                    job: this.transformJobForForm(job),
                })
            )
            .catch(error =>
                this.setState({
                    loadingError: error,
                })
            )
            .finally(() => this.setState({ loading: false }));
    };

    transformJobForForm(job) {
        const coordinator = job.coordinator
            ? { label: job.coordinator.name, value: job.coordinator.id }
            : null;
        const dateReceived = moment(job.dateReceived);
        return { ...job, coordinator, dateReceived };
    }

    transformCoordinatorsForSelection(coordinators) {
        const sorted = coordinators.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        return sorted.map(c => ({ label: c.name, value: c.id }));
    }

    handleCancel = () => this.props.history.goBack();

    handleSubmit = (values, { setSubmitting }) => {
        this.setState({ formError: null });
        const { job } = this.state;
        const { id } = this.props.match.params;

        if (isEqual(job, values)) {
            this.setState({ formError: { message: "No changes made" } });
            setSubmitting(false);
            return;
        }

        const jobBody = {
            ...values,
            dateReceived: values.dateReceived.format(),
            coordinatorId: values.coordinator.value,
        };

        jobsService
            .edit(jobBody)
            .then(() => {
                const jobDetailPath = generatePath(Routes.jobs.DETAIL, { id });
                this.props.history.push(jobDetailPath);
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
            <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
    );

    renderComponent(component) {
        return (
            <Container>
                {this.renderBreadcrumb()}
                <h2>Edit Job</h2>
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
            coordinators,
        } = this.state;
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
                <EditJobForm
                    job={job}
                    coordinators={coordinators}
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                />
            </>
        );
    }
}

export default EditJobFormContainer;
