import React from "react";
import CreateResourceForm from "./CreateResourceForm";
import Alert from "../../common/alert";
import Container from "../../common/containers";
import Breadcrumb from "../../common/breadcrumb";
import Routes from "../../../routes";
import { generatePath, Link } from "react-router-dom";
import { resourcesService } from "../../../services";

class CreateResourceFormContainer extends React.Component {
    state = {
        error: null,
    };

    handleCancel = () => this.props.history.goBack();

    handleSubmit = (values, { setSubmitting }) => {
        this.setState({ error: null });

        resourcesService
            .create(values)
            .then(id => {
                const detailPath = generatePath(Routes.resources.DETAIL, {
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
                <Link className="breadcrumb-item" to={Routes.resources.LIST}>
                    Plant
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
                <h2>Add Plant</h2>
                {error && <Alert variant="danger">{error.message}</Alert>}
                <CreateResourceForm
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                />
            </Container>
        );
    }
}

export default CreateResourceFormContainer;
