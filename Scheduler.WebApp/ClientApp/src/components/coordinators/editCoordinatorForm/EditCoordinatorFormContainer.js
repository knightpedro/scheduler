import React from "react";
import Alert from "../../common/alert";
import Breadcrumb from "../../common/breadcrumb";
import Container from "../../common/containers";
import { isEqual } from "lodash";
import { coordinatorsService } from "../../../services";
import { Loading, LoadingFailure } from "../../common/loading";
import EditCoordinatorForm from "./EditCoordinatorForm";
import Routes from "../../../routes";
import { Link, generatePath } from "react-router-dom";

class EditCoordinatorFormContainer extends React.Component {
    state = {
        loading: true,
        loadingError: null,
        formError: null,
        coordinator: null,
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        coordinatorsService
            .getById(id)
            .then(c => this.setState({ coordinator: c, loading: false }))
            .catch(error =>
                this.setState({ loading: false, loadingError: error })
            );
    }

    handleCancel = () => this.props.history.goBack();

    handleSubmit = (values, { setSubmitting }) => {
        this.setState({ formError: null });
        const { coordinator } = this.state;
        if (isEqual(coordinator, values)) {
            this.setState({ formError: { message: "No changes made." } });
            setSubmitting(false);
        } else {
            coordinatorsService
                .edit(values)
                .then(() => {
                    const detailPath = generatePath(
                        Routes.coordinators.DETAIL,
                        { id: coordinator.id }
                    );
                    this.props.history.push(detailPath);
                })
                .catch(error => {
                    this.setState({ formError: error });
                    setSubmitting(false);
                });
        }
    };

    renderBreadcrumb = () => (
        <Breadcrumb>
            <Link className="breadcrumb-item" to={Routes.coordinators.LIST}>
                Coordinators
            </Link>
            <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
    );

    renderComponent(component) {
        return (
            <Container>
                {this.renderBreadcrumb()}
                <h2>Edit Coordinator</h2>
                {component}
            </Container>
        );
    }

    render() {
        const { loading, loadingError, formError, coordinator } = this.state;
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
                <EditCoordinatorForm
                    coordinator={coordinator}
                    handleCancel={this.handleCancel}
                    handleSubmit={this.handleSubmit}
                />
            </>
        );
    }
}

export default EditCoordinatorFormContainer;
