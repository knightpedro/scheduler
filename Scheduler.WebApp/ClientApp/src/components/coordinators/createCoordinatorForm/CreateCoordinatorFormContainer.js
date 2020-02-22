import React from "react";
import { Link, generatePath } from "react-router-dom";
import CreateCoordinatorForm from "./CreateCoordinatorForm";
import Container from "../../common/containers";
import Alert from "../../common/alert";
import { coordinatorsService } from "../../../services";
import Routes from "../../../routes";
import Breadcrumb from "../../common/breadcrumb";

class CreateCoordinatorFormContainer extends React.Component {
    state = {
        error: null,
    };

    handleCancel = () => this.props.history.goBack();

    handleSubmit = (values, { setSubmitting }) => {
        this.setState({ error: null });
        coordinatorsService
            .create(values)
            .then(id => {
                const detailPath = generatePath(Routes.coordinators.DETAIL, {
                    id,
                });
                this.props.history.push(detailPath);
            })
            .catch(error => {
                this.setState({ error });
                setSubmitting(false);
            });
    };

    renderBreadcrumb() {
        return (
            <Breadcrumb>
                <Link className="breadcrumb-item" to={Routes.coordinators.LIST}>
                    Coordinators
                </Link>
                <Breadcrumb.Item active>Create</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    render() {
        const { error } = this.state;
        return (
            <Container>
                {this.renderBreadcrumb()}
                <h2>Add Coordinator</h2>
                {error && <Alert variant="danger">{error.message}</Alert>}
                <CreateCoordinatorForm
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                />
            </Container>
        );
    }
}

export default CreateCoordinatorFormContainer;
