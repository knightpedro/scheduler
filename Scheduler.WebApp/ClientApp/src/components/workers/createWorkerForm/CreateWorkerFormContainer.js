import React from "react";
import CreateWorkerForm from "./CreateWorkerForm";
import { workersService } from "../../../services";
import Routes from "../../../routes";
import Alert from "../../common/alert";
import Container from "../../common/containers";
import Breadcrumb from "../../common/breadcrumb";
import { Link, generatePath } from "react-router-dom";

class CreateWorkerFormContainer extends React.Component {
    state = {
        error: null,
    };

    handleCancel = () => this.props.history.goBack();

    handleSubmit = (values, { setSubmitting }) => {
        this.setState({ error: null });
        workersService
            .create(values)
            .then(id => {
                const detailPath = generatePath(Routes.workers.DETAIL, { id });
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
                <Link className="breadcrumb-item" to={Routes.workers.LIST}>
                    Staff
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
                <h2>Add Staff Member</h2>
                {error && <Alert variant="danger">{error.message}</Alert>}
                <CreateWorkerForm
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                />
            </Container>
        );
    }
}

export default CreateWorkerFormContainer;
