import React from "react";
import CreateWorkerForm from "./CreateWorkerForm";
import axios from "axios";
import { WORKERS_URL } from "../../../api";
import Routes from "../../../routes";
import Alert from "react-bootstrap/Alert";
import Container from "../../common/containers";
import Breadcrumb from "../../common/breadcrumb";

class CreateWorkerFormContainer extends React.Component {
    state = {
        error: null,
    };

    handleCancel = () => this.props.history.goBack();

    handleSubmit = (values, { setSubmitting }) => {
        this.setState({ error: null });
        axios
            .post(WORKERS_URL, values)
            .then(() => this.props.history.push(Routes.workers.LIST))
            .catch(error => {
                this.setState({ error });
                setSubmitting(false);
            });
    };

    renderBreadcrumb() {
        return (
            <Breadcrumb>
                <Breadcrumb.Item href={Routes.workers.LIST}>
                    Staff
                </Breadcrumb.Item>
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
