import React from "react";
import EditWorkerForm from "./EditWorkerForm";
import { Loading, LoadingFailure } from "../../common/loading";
import { Link, generatePath } from "react-router-dom";
import Routes from "../../../routes";
import { workersService } from "../../../services";
import { isEqual } from "lodash";
import Alert from "../../common/alert";
import Container from "../../common/containers";
import Breadcrumb from "../../common/breadcrumb";

class EditWorkerFormContainer extends React.Component {
    state = {
        loading: true,
        loadingError: null,
        formError: null,
        worker: null,
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        workersService
            .getById(id)
            .then(worker =>
                this.setState({
                    loading: false,
                    worker,
                })
            )
            .catch(error =>
                this.setState({
                    loading: false,
                    loadingError: error,
                })
            );
    }

    handleCancel = () => this.props.history.goBack();

    handleSubmit = (values, { setSubmitting }) => {
        this.setState({ formError: null });
        const { worker } = this.state;
        if (isEqual(worker, values)) {
            this.setState({ formError: { message: "No changes made" } });
            setSubmitting(false);
            return;
        }

        workersService
            .edit(values)
            .then(() => {
                const redirect = generatePath(Routes.workers.DETAIL, {
                    id: worker.id,
                });
                this.props.history.push(redirect);
            })
            .catch(error => {
                this.setState({ formError: error });
                setSubmitting(false);
            });
    };

    renderBreadcrumb(worker) {
        const workerPath = generatePath(Routes.workers.DETAIL, {
            id: worker.id,
        });
        return (
            <Breadcrumb>
                <Link className="breadcrumb-item" to={Routes.workers.LIST}>
                    Staff
                </Link>
                <Link className="breadcrumb-item" to={workerPath}>
                    {worker.name}
                </Link>
                <Breadcrumb.Item active>Edit</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    renderComponent(component) {
        return (
            <Container>
                <h2>Edit Staff Member</h2>
                {component}
            </Container>
        );
    }

    render() {
        const { loading, loadingError, formError, worker } = this.state;

        if (loading) return this.renderComponent(<Loading />);
        if (loadingError)
            return this.renderComponent(
                <LoadingFailure message={loadingError.message} />
            );

        return (
            <Container>
                {this.renderBreadcrumb(worker)}
                <h2>Edit Staff Member</h2>
                {formError && (
                    <Alert variant="danger">{formError.message}</Alert>
                )}
                <EditWorkerForm
                    worker={worker}
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                />
            </Container>
        );
    }
}

export default EditWorkerFormContainer;
